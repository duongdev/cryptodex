import log from 'loglevel'

log.setLevel((process.env.LOG_LEVEL as log.LogLevelDesc) || 'info')

export const logger = log
