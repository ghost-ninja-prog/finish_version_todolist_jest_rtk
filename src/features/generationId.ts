type GenerationId = () => string

export const generationId: GenerationId = () => (
    Math.random().toString().slice(2, 10) + new Date().getTime().toString()
)