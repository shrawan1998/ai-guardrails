import { CustomDataGrid } from "./CustomDataGrid";

export const ChatGrid = () => {
  
  const columns = [
    { field: "user_email", headerName: "User",flex: 2 },
    { field: "text", headerName: "Prompt",flex: 6 },
    { field: "created_at", headerName: "Time" ,flex: 2},
  ];
  const entity = 'chat_log'

  const initialSort = [
    {
      field: "created_at",
      sort: "desc",
    },
  ];
  return (
   <CustomDataGrid columns={columns} entity={entity}  initialSort={initialSort}/>
  );
};
