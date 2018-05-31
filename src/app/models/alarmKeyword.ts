export class AlarmKeyword {

  public fireAlarmIdentifier: string;
  public fireAlarmKeywords: string[];
  public technicalAlarmKeywords: string[];

  constructor(fireAlarmIdentifier: string, fireAlarmKeywords: string[], technicalAlarmKeywords: string[]) {
      this.fireAlarmIdentifier = fireAlarmIdentifier;
      this.fireAlarmKeywords = fireAlarmKeywords;
      this.technicalAlarmKeywords = technicalAlarmKeywords;
  }

}