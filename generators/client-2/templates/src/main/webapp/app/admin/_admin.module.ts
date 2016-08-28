import { AdminStateConfig } from './admin.state';
import { AuditStateConfig } from './audits/audits.state';
import { ConfigStateConfig } from './configuration/configuration.state';
import { DocsStateConfig } from './docs/docs.state';
<%_ if (applicationType === 'gateway') { _%>
import { GatewayStateConfig } from './gateway/gateway.state';
<%_ } _%>
import { HealthStateConfig } from './health/health.state';
import { LogsStateConfig } from './logs/logs.state';
import { MetricsStateConfig } from './metrics/metrics.state';
<%_ if (websocket === 'spring-websocket') { _%>
import { TrackerStateConfig } from './tracker/tracker.state';
<%_ } _%>
import { UserMgmntStateConfig } from './user-management/user-management.state';

import { AuditsComponent } from "./audits/audits.component";
import { LogsComponent } from './logs/logs.component';

import { HealthModalController } from "./health/health-modal.controller";
import { <%=jhiPrefixCapitalized%>HealthCheckComponent } from './health/health.component';
import { <%=jhiPrefixCapitalized%>ConfigurationComponent } from './configuration/configuration.component';

import { AuditsService } from './audits/audits.service';
import { <%=jhiPrefixCapitalized%>HealthService } from './health/health.service';
import { LogsService } from './logs/logs.service';
import { ParseLinks } from "../components/util/parse-links.service";

import { upgradeAdapter } from '../upgrade_adapter';

upgradeAdapter.addProvider(AuditsService);
upgradeAdapter.addProvider(<%=jhiPrefixCapitalized%>HealthService);
upgradeAdapter.addProvider(LogsService);
upgradeAdapter.addProvider(ParseLinks);

upgradeAdapter.upgradeNg1Provider('$uibModal');

angular
    .module('<%=angularAppName%>.admin', [
        'ngStorage', <% if (enableTranslation) { %>
        'tmh.dynamicLocale',
        'pascalprecht.translate', <% } %>
        'ngResource',
        'ui.bootstrap',
        'ui.router'
    ])
    .config(AdminStateConfig)
    .config(AuditStateConfig)
    .config(ConfigStateConfig)
    .config(DocsStateConfig)
<%_ if (applicationType === 'gateway') { _%>
    .config(GatewayStateConfig)
<%_ } _%>
    .config(HealthStateConfig)
    .config(LogsStateConfig)
    .config(MetricsStateConfig)
<%_ if (websocket === 'spring-websocket') { _%>
    .config(TrackerStateConfig)
<%_ } _%>
    .config(UserMgmntStateConfig)
    .controller('HealthModalController', HealthModalController)
    .directive('<%=jhiPrefix%>Audit', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(AuditsComponent))
    .directive('<%=jhiPrefix%>Configuration', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(<%=jhiPrefixCapitalized%>ConfigurationComponent))
    .directive('<%=jhiPrefix%>Health', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(<%=jhiPrefixCapitalized%>HealthCheckComponent))
    .directive('<%=jhiPrefix%>Logs', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(LogsComponent))
    .factory('<%=jhiPrefixCapitalized%>HealthService', upgradeAdapter.downgradeNg2Provider(<%=jhiPrefixCapitalized%>HealthService));