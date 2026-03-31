import cron from "node-cron"
import {getAllEndpoints} from "../repositories/endpoints.repository.js"
import { savePingResult } from "../repositories/ping.repository.js"
import { createIncident, getRecentFailures } from "../repositories/incident.repository.js"
import { logger } from "../utils/logger.js";
import eventEmitter from "../utils/eventEmitter.js";


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
                    logger.info('failures count:', recentFailures.length, 'for endpoint:', endpoint.id)
                    
                    let incident;
                    if(recentFailures.length === 3){
                        logger.info('creating incident for:', endpoint.id)
                        incident = await createIncident(endpoint.id)
                    }

                    eventEmitter.emit('event',
                         {
                            id :endpoint.id,
                            responseTime: responseTime,
                            status : statusCode,
                            incident: incident
                        })
                        
                }catch(err){
                   logger.error(err)
            }
        });

    });
}
