import { Injectable } from '@angular/core';
import { LogLevel } from './log-level.enum';
import { environment } from '@env/environment';
import { LoggerService } from './logger.service';

/**
 * @description Logger service for environment logging.
 */
@Injectable()
export class BetterLoggerService {

  debug(): void {
    console.log("override")
  }

}
