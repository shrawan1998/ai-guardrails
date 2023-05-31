export type AnalysisObject = {
    flagged_text: string,
    end: number,
    entity_type: string,
    score: number,
    start: number
}

export type AnalysisResponseType = Array<AnalysisObject>