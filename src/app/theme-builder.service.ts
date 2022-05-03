import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuilderResult } from './types/builder-result';
import { BuilderConfig } from './types/builder-config';
import { Theme } from './types/theme';
import { Metadata } from './types/metadata';
import { GlobalVariable } from './global';

@Injectable()
export class ThemeBuilderService {
    private metadata = null;
    private runningPromise = null;

    constructor(private http: HttpClient) {}

    private build(theme: Theme, config: BuilderConfig): Promise<BuilderResult> {
        config.baseTheme = theme.name + '.' + theme.colorScheme.replace(/-/g, '.');
        if (GlobalVariable.buildCount > 1) {
            GlobalVariable.isDefaultTheme = false;
        }
        GlobalVariable.buildCount++;
        var postBuilder: Promise<any> = this.http.post(`${GlobalVariable.backEndUrl}/ThemeBuilder/BuildTheme`, {
            version: GlobalVariable.version,
            config: JSON.stringify(config),
            writeDebugTimeLogs: false
        }).toPromise();
        postBuilder = postBuilder.then(function (result) {
            if (result.Error == true) {
                console.error(result.ErrorDescription);
                throw new Error(result.ErrorDescription);
            }
            GlobalVariable.currentVariables = result.Data.compiledMetadata;
            GlobalVariable.currentCss = result.Data.css;
            return result.Data;
        });
        return postBuilder;
    }

    buildTheme(theme, config: BuilderConfig): Promise<BuilderResult> {
        return this.build(theme, config);
    }

    getMetadata(): Promise<Metadata> {
        var self = this;
        if (this.metadata != null) {
            return Promise.resolve(this.metadata);
        }
        if (this.runningPromise != null) {
            return this.runningPromise;
        }
        this.runningPromise = this.http.get(`${GlobalVariable.devExpressUrl}/metadata`).toPromise() as Promise<Metadata>;
        this.runningPromise.then(function (metadata) {
            self.metadata = metadata;
            return metadata;
        }).finally(jqXhr =>
            this.runningPromise = null
        );
        return this.runningPromise;
    }
}
