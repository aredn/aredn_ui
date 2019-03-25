declare namespace ArednApi {

    interface ApiResponse {
        pages: {
            status?: StatusPage,
            scan?: ScanPage
        };
    }

    interface ScanPage {
        scanlist?: Array<ScanListResult>
    }

    interface ScanListResult {
        encryption?: ScanListEncryption,
        quality_max?: number,
        ssid?: string,
        channel?: number,
        signal?: number,
        bssid?: string,
        mode?: string,
        quality?: number
    }

    interface ScanListEncryption {
        enabled?: boolean,
        auth_algs?: Array<string>,
        description?: string,
        wep?: boolean,
        auth_suites?: Array<string>,
        wpa?: number,
        pair_ciphers?: Array<string>,
        group_ciphers?: Array<string>
    }

    interface StatusPage {
        meshrf?: MeshRf;
        memory?: Memory;
        storage?: Storage;
        sysinfo?: SysInfo;
        location?: Location;
        olsr?: OLSR;
        ip?: IPAddresses;
    }

    interface SysInfo {
        date: string;
        uptime: string;
        time: string;
        model: string;
        // TODO: Remove
        location?: Array<any>;
        loads: number[];
        node: string;
        firmware_version: string;
    }

    interface Storage {
        rootfree: number;
        tmpfree: number;
    }

    interface Memory {
        freeram: number;
        sharedram: number;
        bufferram: number;
    }

    interface MeshRf {
        band: string;
        ssid: string;
        channel: string;
        device: string;
        chanbw: string;
        frequency: string;
    }

    interface Location {
        lat: string;
        lon: string;
        gridsquare: string;
    }

    interface OLSR {
        nodes: string;
        entries: string;
    }

    interface IPAddresses {
        wifi: string;
        wan: string;
        gateway: string;
        lan: string;
    }

}