import { CustomDataGrid } from "./CustomDataGrid";

export const ConversationGrid = () => {
  
  const columns = [
    { field: "title", headerName: "Title",flex: 4 },
    { field: "user_email", headerName: "User-Email",flex: 3 },
    { field: "created", headerName: "Created" ,flex: 3},
  ];
  const entity = 'conversation_log'

  const initialSort = [
    {
      field: "created",
      sort: "desc",
    },
  ];
  return (
   <CustomDataGrid columns={columns} entity={entity}  initialSort={initialSort}/>
  );
};
