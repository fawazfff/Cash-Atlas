# Second Life

**Give everyday things another chance.**

Second Life is an AI-powered object reuse assistant built for **Frontier Cascadia 2026**. Before an everyday item becomes waste, a user can take or upload a photo and get practical ways to repair it, reuse it, donate it, transform it, or dispose of it responsibly.

## The problem

Useful objects are often thrown away because people do not know whether they can be repaired, reused, donated, or recycled. Finding that information manually takes time and often depends on understanding the object's material and condition.

## The solution

Second Life turns one photo into a simple next-step guide. The AI identifies what is visibly in the image, explains the likely material and condition, recommends the best next life, and gives three practical options with steps the user can follow.

The product is designed to be understandable without technical knowledge. It also communicates uncertainty instead of pretending to know hidden damage, exact material composition, or local recycling availability from an image alone.

## How it works

1. Upload a clear photo of one everyday object.
2. Select **Analyze its next lives**.
3. Second Life analyzes the image with AI.
4. The user receives:
   - the identified object
   - likely material and visible condition
   - confidence level
   - the recommended next action and why
   - likely impact
   - three practical next-life options with steps
   - safety and responsible-disposal guidance

## AI value

The core AI workflow uses image understanding to turn an unstructured photo into useful, object-specific guidance. Without AI, the user would need to identify the item and material themselves and search separately for repair, reuse, donation, and disposal ideas.

Second Life's prompt is deliberately conservative: it tells the model not to invent hidden damage, exact composition, local facilities, or recycling availability. When the image is unclear, the app asks for a clearer photo rather than presenting a confident guess.

## Tech

- HTML, CSS, and JavaScript frontend
- Vercel serverless API
- OpenAI Responses API with vision
- Structured JSON output rendered into the result experience
- Client-side image resizing before analysis

## Demo

Live app: https://cash-atlas.vercel.app/

For the clearest demo, upload a well-lit photo containing one obvious object such as an old shoe, backpack, bottle, shirt, cardboard box, or chair.

## Privacy and safety

The current prototype does not require an account. Images are sent to the analysis endpoint when the user chooses to analyze them. AI can make mistakes, so users are reminded to check local repair, donation, and recycling rules before acting.

## Hackathon

Built for **Frontier Cascadia 2026** as an **AI for Good** project.

Second Life asks a simple question before something becomes waste:

> **What else could this become?**
