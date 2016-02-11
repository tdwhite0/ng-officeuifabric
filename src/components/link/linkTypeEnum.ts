'use strict';

/**
 * Enum for all possible button types supported by Office UI Fabric. Enums in JavaScript are always indexed but this enum is
 * intended to be used as a string.
 * 
 * @readonly
 * @enum {string}
 * @usage
 * 
 * This is used to generate the string that you pass into the <uif-link /> directive. Specifically, the string is passed 
 * to the `uif-type` attribute. To evaluate the enum value as a string:
 * 
 * let linkType: string = LinkTypeEnum[LinkTypeEnum.primary];
 */
export enum LinkTypeEnum {
  hero
};
