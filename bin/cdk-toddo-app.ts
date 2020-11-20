#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkToddoAppStack } from '../lib/cdk-toddo-app-stack';

const app = new cdk.App();
new CdkToddoAppStack(app, 'CdkToddoAppStack');
