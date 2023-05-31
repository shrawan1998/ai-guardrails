
class utils:
    def rename_id(data):
        if isinstance(data, list):
            for i in range(len(data)):
                data[i] = utils.rename_id(data[i])
        elif isinstance(data, dict):
            if '_id' in data:
                data['id'] = data['_id']
                del data['_id']
        return data