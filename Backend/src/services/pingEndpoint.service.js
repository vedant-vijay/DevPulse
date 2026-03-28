import cron from "node-cron"
import {getAllEndpoints} from "../repositories/endpoints.repository.js"
import { savePingResult } from "../repositories/ping.repository.js"
import { createIncident, getRecentFailures } from "../repositories/incident.repository.js"

export async function startPingService() {
    cron.schedule('* * * * *',async () => {
            const getEndpoints = await getAllEndpoints()
            getEndpoints.forEach(async(endpoint) => { 
                try{
                    const start = Date.now()
                    const data = await fetch(endpoint.url, {method : endpoint.method})
                    const statusCode =  data.status
                    const responseTime = Date.now() - start

                    const isSuccess = statusCode === endpoint.expected_status
                    await savePingResult(endpoint.id, statusCode, responseTime, isSuccess)
                    const recentFailures = await getRecentFailures(endpoint.id)
                    console.log('failures count:', recentFailures.length, 'for endpoint:', endpoint.id)

                    if(recentFailures.length === 3){
                        console.log('creating incident for:', endpoint.id)
                        await createIncident(endpoint.id)
                    }
         
                }catch(err){
                    console.log(err)
            
            }
        });

    });
}