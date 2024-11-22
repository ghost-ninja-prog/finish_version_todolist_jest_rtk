type GenerationId = () => string

export const generationId: GenerationId = () => (
    Math.random().toString(16).slice(2) + new Date().getTime().toString()
)