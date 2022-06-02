import { properties } from "../../properties";

/** @format */
export interface zoneStorage extends properties {
    name: string;
    tag: string;
    isUsed: boolean;
    position: number;
    subject: Array<properties>;
    data: Array<properties>;
}