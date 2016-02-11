'use strict';

import * as ng from 'angular';
import {LinkTypeEnum} from './linkTypeEnum';

/**
 * @ngdoc directive
 * @name uifLink
 * @module officeuifabric.components.link
 *
 * @restrict E
 *
 * @description
 * `<uif-link>` is a link directive.
 *
 * @param {string=} ng-href the url
 *
 *
 * @see {link http://dev.office.com/fabric/components/link}
 *
 * @usage
 *
 * <uif-link ng-href="http://ngofficeuifabric.com">Link text</uif-link>
 */
export class LinkDirective implements ng.IDirective {

    public restrict: string = 'E';
    public template: string = '<a ng-href="{{ ngHref }}" class="ms-Link" ng-transclude></a>';
    public scope: {} = {
        ngHref: '@',
        uifType: '@'
    };

    public transclude: boolean = true;
    public replace: boolean = true;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new LinkDirective();
        return directive;
    }


    public compile(templateElement: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, transclude: ng.ITranscludeFunction)
        : ng.IDirectivePrePost {

        return {
            pre: this.preLink
        };
    }

    private preLink(
        scope: any,
        instanceElement: ng.IAugmentedJQuery,
        attrs: any,
        ctrls: any[],
        transclude: ng.ITranscludeFunction): void {

        scope.$watch('uifType', (newValue: string, oldValue: string) => {
            if (LinkTypeEnum[newValue] === undefined) {
                console.log('Error [ngOfficeUiFabric] officeuifabric.components.link - "' +
                    newValue + '" is not a valid value for uifType. ' +
                    'Supported options are listed here: ' +
                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/link/linkTypeEnum.ts');
            }
        });

    }
}






/**
 * @ngdoc module
 * @name officeuifabric.components.link
 *
 * @description
 * Link
 *
 */
export var module: ng.IModule = ng.module('officeuifabric.components.link', [
    'officeuifabric.components'
])
    .directive('uifLink', LinkDirective.factory());
