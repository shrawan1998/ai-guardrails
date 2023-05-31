import psycopg2
from globals import Globals


conn = None
def create_connection():
    global conn
    if not conn or conn.closed:
        print('creating postgres connection')
        conn = psycopg2.connect(
            host=Globals.pg_host,
            port=Globals.pg_port,
            user=Globals.pg_user,
            password=Globals.pg_password,
            database=Globals.pg_db,
            
        )
    return conn


pg_schema = Globals.pg_schema


analysis_insert_query = f"""INSERT INTO {pg_schema}."analysis_audit" (id, "text", created_at, user_email, flagged_text, analysed_entity, criticality)
                          VALUES(gen_random_uuid(), %s, CURRENT_TIMESTAMP, %s, %s, %s, %s);"""


anonymize_insert_query = f"""INSERT INTO {pg_schema}.anonymize_audit (id, original_text, anonymized_text, flagged_text, created_at, user_email, analysed_entity, criticality)
                            VALUES(gen_random_uuid(), %s, %s, %s, CURRENT_TIMESTAMP, %s, %s, %s);"""

chat_log_insert_query = f'''INSERT INTO {pg_schema}.chat_log (id, created_at, user_email, "text")
                             VALUES(gen_random_uuid(), CURRENT_TIMESTAMP, %s, %s);'''
get_org_query = f'''SELECT * FROM {pg_schema}.organisation;'''


def get_filter_conditions(filter_dict):
    filter_conditions = ""
    filter_field = filter_dict['filterField']
    filter_operator = filter_dict['filterOperator']
    filter_value = filter_dict['filterValue'].lower()  # Convert filter value to lowercase for case-insensitive search

    if filter_operator == 'contains':
        filter_conditions = f"LOWER({filter_field}) LIKE '%{filter_value}%'"
    elif filter_operator == 'equals':
        filter_conditions = f"LOWER({filter_field}) = '{filter_value}'"
    elif filter_operator == 'startsWith':
        filter_conditions = f"LOWER({filter_field}) LIKE '{filter_value}%'"
    elif filter_operator == 'endsWith':
        filter_conditions = f"LOWER({filter_field}) LIKE '%{filter_value}'"
    elif filter_operator == 'isEmpty':
        filter_conditions = f"{filter_field} IS NULL"
    elif filter_operator == 'isNotEmpty':
        filter_conditions = f"{filter_field} IS NOT NULL"
    elif filter_operator == 'isAnyOf':
        if len(filter_value) > 0:
            values = ",".join([f"'{value.lower()}'" for value in filter_value])  # Convert each value to lowercase
            filter_conditions = f"LOWER({filter_field}) IN ({values})"

    return filter_conditions


class sql_audits:
    def insert_analysis_audits(text, user_email, flagged_text, analysed_entity, criticality):
        create_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            analysis_insert_query,
            (text, user_email, flagged_text, analysed_entity, criticality),
        )
        conn.commit()  
        cursor.close()

    def insert_anonymize_audits(original_text, anonymized_text, flagged_text, user_email, analysed_entity, criticality):
        create_connection()
        cursor = conn.cursor()
        cursor.execute(
            anonymize_insert_query, (original_text, anonymized_text, flagged_text, user_email, analysed_entity, criticality)
        )
        conn.commit()  
        cursor.close()

    def insert_chat_log(user_email, text):
        create_connection()
        cursor = conn.cursor()
        cursor.execute(
            chat_log_insert_query, (user_email, text)
        )
        conn.commit()  
        cursor.close()
    
    def get_chat_log():
        create_connection()
        cur = conn.cursor()
        cur.execute(f'''SELECT * FROM {pg_schema}.chat_log''')
        data = cur.fetchall()
        cur.close()
        return json.dumps(data, indent=4, sort_keys=True, default=str)
    
    #admin apis below
    def getorg():
        create_connection()
        cur = conn.cursor()
        cur.execute(get_org_query)
        data = cur.fetchone()
        cur.close()
        return json.dumps(data, indent=4, sort_keys=True, default=str)
    
    def saveorg(orgdata):
        create_connection()
        cur = conn.cursor()
        apiresponse=''
        cur.execute(f"SELECT * FROM {pg_schema}.organisation")
        empty_records = cur.fetchone()
        if not empty_records:
            try:
                query=f'''INSERT INTO {pg_schema}.organisation (name, email, details, openai_key, created_at) VALUES (%s,%s, %s, %s, current_timestamp)'''
                cur.execute(query, (orgdata['name'], orgdata['email'], orgdata['details'],orgdata['openai_key']))
                conn.commit()
                apiresponse="{'success':True}"
            except Exception as e:
                conn.rollback()
                apiresponse="Error: {}".format(str(e))
        else:
            try:
                query = f"UPDATE {pg_schema}.organisation SET name = %s, email = %s, details = %s, openai_key = %s, created_at = current_timestamp WHERE id = %s"
                cur.execute(query, (orgdata['name'], orgdata['email'], orgdata['details'],orgdata['openai_key'],empty_records[0]))
                conn.commit()
                apiresponse="{'success':True}"
            except Exception as e:
                conn.rollback()
                apiresponse="Error: {}".format(str(e))
        cur.close()
        
        return json.dumps(apiresponse)
    
    def get_list_query(table, sort, range_, filter_):
        create_connection()
        query = f"SELECT * FROM {table}"
        filter_dict=eval(filter_)
        if len(filter_dict)!=0:
            filter_conditions = get_filter_conditions(filter_dict)
            
            if(filter_conditions!=''):
                query += f" WHERE {filter_conditions}"


        if sort:
            sort_list = eval(sort)
            sort_str = " ".join(sort_list)
            query += f" ORDER BY {sort_str}"
        if range_:
            range_list = eval(range_)
            start = range_list[0]
            end = range_list[1]
            query += f" OFFSET {start} LIMIT {end - start + 1}"
        cursor = conn.cursor()
        cursor.execute(query)
        rows=cursor.fetchall()
        data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]

        return data

    def get_one_query(table, id):
        create_connection()
        query = f"SELECT * FROM {table} WHERE id=%s"
        cursor = conn.cursor()
        cursor.execute(query, (id,))
        row=cursor.fetchone()
        columns = [desc[0] for desc in cursor.description]
        row_dict = {}
        for i in range(len(columns)):
            row_dict[columns[i]] = row[i]
        return row_dict
    
    def count_query(table, filter_):
        create_connection()
        query = f"SELECT count(*) FROM {table}"
        filter_dict=eval(filter_)
        if len(filter_dict)!=0:
            filter_conditions = get_filter_conditions(filter_dict)
            
            if(filter_conditions!=''):
                query += f" WHERE {filter_conditions}"

        cursor = conn.cursor()
        cursor.execute(query)
        count=cursor.fetchone()
        return count[0]
    
    def total_count_query(table):
        create_connection()
        query = f"SELECT count(*) FROM {table}"
        cursor = conn.cursor()
        cursor.execute(query, (id,))
        count=cursor.fetchone()
        return count[0]

    def create_query(table, data):
        create_connection()
        keys = ", ".join(data.keys())
        values_template = ", ".join(["%s" for _ in data.values()])
        values = tuple(data.values())

        query = f"INSERT INTO {table} ({keys}) VALUES ({values_template}) RETURNING id"
        cursor = conn.cursor()
        cursor.execute(query, values)
        conn.commit()

        new_id = cursor.fetchone()[0]
        return sql_audits.get_one_query(table,new_id)

    def update_query(table, id, data):
        create_connection()
        set_list = [f"{key}=%s" for key in data.keys()]
        set_str = ", ".join(set_list)
        values = tuple(data.values()) + (id,)

        query = f"UPDATE {table} SET {set_str} WHERE id=%s"
        cursor = conn.cursor()
        cursor.execute(query, values)
        conn.commit()
        return sql_audits.get_one_query(table,id)
    
    #Get rules name from provider
    def get_all_enabled_entities(table,provider_name):
        create_connection()
        query = f"SELECT name FROM {table} where provider='{provider_name}' and is_active = true"
        cursor = conn.cursor()
        cursor.execute(query, (id,))
        count=cursor.fetchall()
        enabled_entities = [item[0] for item in count]
        return enabled_entities