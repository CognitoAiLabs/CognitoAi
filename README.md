# Cognito Experiments Framework

<div align="center">

![Cognito Banner](docs/assets/Bannerv2.png) *(Note: Add your logo here)*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.0-blue.svg)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-green.svg)](https://openai.com/)
[![Node.js](https://img.shields.io/badge/Node.js-16.0.0+-purple.svg)](https://nodejs.org/)

*An advanced framework for conducting AI agent interaction experiments and behavioral studies*

[Getting Started](docs/getting-started.md) •
[Documentation](#documentation) •
[Contributing](CONTRIBUTING.md) •
[License](#license)

</div>

## Overview

Cognito is an experimental framework designed for studying and analyzing interactions between AI agents. It provides a robust platform for:

- Conducting controlled experiments with multiple AI agents
- Analyzing agent behaviors and interaction patterns
- Collecting and analyzing conversation data
- Generating statistical insights and behavioral metrics
- Supporting research in multi-agent AI systems

## Features

- 🤖 **Multi-Agent Support**: Create and manage multiple AI agents with distinct personalities and traits
- 💬 **Dynamic Chat Rooms**: Facilitate controlled conversations between agents
- 📊 **Analytics Engine**: Collect and analyze interaction data
- 🔄 **Flexible Architecture**: Easily extensible for custom experimental setups
- 📝 **Detailed Logging**: Comprehensive logging of all agent interactions
- 🎯 **Experiment Templates**: Pre-built templates for common research scenarios

## Quick Start

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CognitoAiLabs/CognitoAi.git
cd cognito
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your OpenAI API key
```

4. Start:
```bash
npm run start
```

For detailed setup instructions, see our [Getting Started Guide](docs/getting-started.md).

## Documentation

Our comprehensive documentation includes:

- [Getting Started Guide](docs/getting-started.md) - First steps and basic usage
- [Architecture Overview](docs/architecture.md) - System design and components
- [Configuration Guide](docs/configuration.md) - Environment and project setup
- [Experiments Guide](docs/experiments.md) - Running and managing experiments
- [Analytics Guide](docs/analytics.md) - Understanding and using analytics
- [Interfaces Reference](docs/interfaces-reference.md) - API and type definitions
- [Character Options](docs/character-options.md) - Agent customization options
- [Future Roadmap](docs/future-roadmap.md) - Upcoming features and improvements

## Technical Specifications

- **Agent Limits**: 2-5 agents per conversation
- **Message Limits**: 1-10 messages per agent
- **Models**: Compatible with GPT-4 and other OpenAI models
- **Storage**: Local JSON-based session storage
- **Analytics**: End-of-conversation analysis with detailed metrics

For complete technical details, see our [Configuration Guide](docs/configuration.md).

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for:

- Code of Conduct
- Development process
- Pull request guidelines
- Coding standards
- Testing requirements

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for their powerful language models
- The AI research community
- All contributors and supporters

## Support

- [Report Issues](https://github.com/CognitoAiLabs/CognitoAi/issues)
- [Request Features](https://github.com/CognitoAiLabs/CognitoAi/issues)
- [Project Wiki](https://github.com/CognitoAiLabs/CognitoAi/wiki)

## Contact

- Twitter: [@cognitoai_](https://x.com/cognitoai_)
- Website: [cognitoai.tech](https://cognitoai.tech)
- Project Link: [https://github.com/CognitoAiLabs/CognitoAi](https://github.com/CognitoAiLabs/CognitoAi) 