/**
 * Spine commands — list and install deployable architecture stacks.
 * See: docs/ENGINEERING_SPEC_SPINE_INSTALLER.md
 */
export interface SpineManifest {
    name: string;
    description: string;
    source: string;
}
export declare function spineList(): Promise<void>;
export declare function spineInstall(name: string): Promise<void>;
