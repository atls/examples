import { useCallback }     from 'react'

import { useDataRegistry } from '@grpc-playground/data-registry'
import { useClient }       from '@grpc-playground/proto-registry'
import { useSchema }       from '@grpc-playground/proto-registry'

export const useCall = (service, method, callback) => {
  const dataRegistry = useDataRegistry()
  const client = useClient()
  const schema = useSchema()

  return useCallback(async () => {
    const { fullName } = schema && schema[service]

    const data = dataRegistry?.getServiceMethodData(service, method)

    const response = await client.call(fullName, method, data)

    callback(response)
  }, [service, method, callback, dataRegistry, client, schema])
}
