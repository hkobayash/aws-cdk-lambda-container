#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipelineStack } from '../lib/pipeline';

if (!process.env.AWS_REGION) {
    console.error("Please specify the AWS region with the AWS_REGION environment variable");
    process.exit(1);
}

const env = { region: process.env.AWS_REGION };

const app = new cdk.App();
new PipelineStack(app, 'PipelineStack', { env: env });
