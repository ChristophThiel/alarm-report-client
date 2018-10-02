export class AlarmKeyword {

    private _fireAlarmIdentifier: string;
    private _fireAlarmKeywords: string[];
    private _technicalAlarmKeywords: string[];
  
    constructor(fireAlarmIdentifier: string, fireAlarmKeywords: string[], technicalAlarmKeywords: string[]) {
        this._fireAlarmIdentifier = fireAlarmIdentifier;
        this._fireAlarmKeywords = fireAlarmKeywords;
        this._technicalAlarmKeywords = technicalAlarmKeywords;
    }

    public get fireAlarmIdentifier(): string {
        return this._fireAlarmIdentifier;
    }

    public get fireAlarmKeywords(): string[] {
        return this._fireAlarmKeywords;
    }

    public get technicalAlarmKeywords(): string[] {
        return this._technicalAlarmKeywords;
    }
  
  }