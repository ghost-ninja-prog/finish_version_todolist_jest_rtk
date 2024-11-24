type GenerationId = () => number

export const generationId: GenerationId = () => (
   new Date().getTime()
)