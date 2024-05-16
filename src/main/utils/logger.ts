import log from 'electron-log'
import dayjs from 'dayjs'
import { LOG_LEVEL, LOG_MASSAGE } from '../contents/enum'

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
  // TODO：@formkit/tempoに変更
  log.transports.file.fileName = dayjs(new Date()).format('YYYY-MM-DD')
}
