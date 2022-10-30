import * as webpack from 'webpack';
import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';

export default (
    config: webpack.Configuration,
    options: CustomWebpackBrowserSchema,
    targetOptions: TargetOptions
) => {
    // do your config modifications here
    if (config.devServer && config.devServer.allowedHosts) {
        config.devServer.allowedHosts = [
            ...config.devServer.allowedHosts,
            ...['.preview.app.github.dev']];
    }

    return config;
}