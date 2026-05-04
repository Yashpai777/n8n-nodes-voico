# n8n-nodes-voico

This is an n8n community node that integrates [Voico.ai](https://voico.ai) AI voice agents into your n8n workflows. Schedule outbound AI calls, retrieve call details, and fetch full transcripts directly from your automations.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

The Voico node supports three operations:

- **Make Call** - Schedule an outbound AI voice call to any phone number using a configured Voico agent
- **Get Call** - Retrieve the details and status of a specific call by its Call ID
- **Get Transcript** - Fetch the full conversation transcript of a completed call

## Credentials

You need a Voico API key to use this node.

1. Sign up at [platform.voico.ai](https://platform.voico.ai)
2. Generate an API key from your dashboard
3. In n8n, create new Voico API credentials and paste the key

## Compatibility

- Minimum n8n version: 1.0.0
- Tested against n8n v1.x

## Usage

### Make Call

To schedule an outbound AI call, provide:

- **Phone Number** - The destination number with country code (e.g. +919999999999)
- **Agent ID** - Your Voico Agent ID from the Agents page
- **First Message** (optional) - The opening message the agent says when picking up
- **Prompt Override** (optional) - A specific prompt to override the agent prompt for this call
- **Scheduled Time** (optional) - ISO 8601 datetime to schedule the call. Leave empty to call in 1 minute

The node returns a job_id which can be used to retrieve call details and transcripts.

### Get Call

Provide the Call ID returned from a Make Call operation to retrieve the call status, duration, and metadata.

### Get Transcript

Provide the Call ID to retrieve the full conversation transcript once the call is complete.

## Resources

- [Voico Documentation](https://platform.voico.ai/docs)
- [n8n Community Nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT
