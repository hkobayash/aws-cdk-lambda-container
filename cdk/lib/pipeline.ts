import { Construct, Stage, Stack, StackProps, StageProps } from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ShellStep } from '@aws-cdk/pipelines';
import { HttpApiAwsLambdaContainerStack } from './http-api-aws-lambda-container-stack';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('hkobayash/aws-cdk-lambda-container', 'master', {
          connectionArn: 'arn:aws:codestar-connections:ap-northeast-1:380051807429:connection/6a68a055-cad8-4ac8-a3c4-84902a16a28d',
        }),
        commands: [
          'cd cdk',
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
        primaryOutputDirectory: 'cdk/cdk.out',
      }),
    });

    pipeline.addStage(new HttpApiAwsLambdaContainerStage(this, 'HttpApiAwsLambdaContainerStage'));
  }
}

class HttpApiAwsLambdaContainerStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new HttpApiAwsLambdaContainerStack(this, 'HttpApiAwsLambdaContainerStack');
  }
}
