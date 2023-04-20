import { rule } from 'graphql-shield'
import { getUserId } from '../../../utils/backend-auth.utils'

export const isReadingOwnSession = rule()(
    async (_parent, args, context)=> {
        const userId = getUserId(context)
        return userId ==args.sessionId
    }
)