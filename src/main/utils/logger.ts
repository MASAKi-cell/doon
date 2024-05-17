import log from 'electron-log'
import { format } from '@formkit/tempo'
import { LOG_LEVEL, LOG_MASSAGE } from '../contents/enum'

const formatDate = 'YYYY/MM/DD'
const locale = 'Asia/Tokyo'

/**
 * ログの出力
 * @param level
 * @param logMessage
 */
export const logger = (
  level: (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL],
  logMessage: (typeof LOG_MASSAGE)[keyof typeof LOG_MASSAGE]
): void => {
  setTransports()
  log[level](process.pid, logMessage)
}

const setTransports = () => {
  log.transports.file.fileName = format({ date: new Date(), format: formatDate, tz: locale })
}
