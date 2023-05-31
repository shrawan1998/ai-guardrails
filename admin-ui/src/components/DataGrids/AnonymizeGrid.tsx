import { CustomDataGrid } from "./CustomDataGrid";

export const AnonymizeGrid = () => {
  
  const columns = [
    { field: "user_email", headerName: "User",flex: 2 },
    { field: "criticality", headerName: "Criticality",flex: 1 },
    { field: "analysed_entity", headerName: "Analysed Entity",flex: 1 },
    { field: "flagged_text", headerName: "Flagged Text",flex: 1 },
    { field: "original_text", headerName: "Original Text",flex: 1 },
    { field: "anonymized_text", headerName: "Anonymized Text",flex: 1 },
    { field: "created_at", headerName: "Time" ,flex: 2},
  ];
  const entity = 'anonymize_audit'
  const initialSort = [
    {
      field: "created_at",
      sort: "desc",
    },
  ];
  return (
   <CustomDataGrid columns={columns} entity={entity} initialSort={initialSort} />
  );
};