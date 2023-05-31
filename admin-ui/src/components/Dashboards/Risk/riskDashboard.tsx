import { fetchGuestToken } from "@/services";
import { useEffect } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";



export const RiskDashboard = () => {
    const getToken = async () => {
        try {
          const {data} = await fetchGuestToken();
          return data.token
        }
        catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {
        const embed = async () => {
          await embedDashboard({
            id: import.meta.env.VITE_SUPERSET_DASHBOARD_ID , // given by the Superset embedding UI
            supersetDomain: import.meta.env.VITE_SUPERSET_DOMAIN,
            mountPoint: document.getElementById("dashboard")  as HTMLElement, // html element in which iframe render
            fetchGuestToken: () => getToken(),
            dashboardUiConfig: {
              hideTitle: true,
              hideChartControls: true,
              hideTab: true,
              filters:{
                expanded:false
              }
            },
          })
        }
        if (document.getElementById("dashboard")) {
          embed()
        }
      }, [])

      return (
        <>
          <div className="w-100 min-h-full">
            <div id="dashboard" className="min-h-full"/>
          </div>
        </>
        )
}