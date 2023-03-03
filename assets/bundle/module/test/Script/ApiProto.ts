import { pb_1 } from "../../../../main/core/NpmExport";

export namespace ApiProto {
    export enum NewbieType {
        /** 
          默认 老用户
           **/
        NB_DEFAULT = 0,

        /** 
          新增游客账户
           **/
        NB_ANONYMOUS = 1,

        /** 
          游客升级正式账户
           **/
        NB_UPGRADE = 2,

        /** 
          直接注册正式账户
           **/
        NB_REGISTER = 3,
    }
    export class LoginInfo extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(
            data?:
                | any[]
                | {
                      user_id?: number;
                      token?: string;
                      newbie_type?: NewbieType;
                      newbie_award?: number;
                  }
        ) {
            super();
            pb_1.Message.initialize(
                this,
                Array.isArray(data) ? data : [],
                0,
                -1,
                [],
                this.#one_of_decls
            );
            if (!Array.isArray(data) && typeof data == "object") {
                if ("user_id" in data && data.user_id != undefined) {
                    this.user_id = data.user_id;
                }
                if ("token" in data && data.token != undefined) {
                    this.token = data.token;
                }
                if ("newbie_type" in data && data.newbie_type != undefined) {
                    this.newbie_type = data.newbie_type;
                }
                if ("newbie_award" in data && data.newbie_award != undefined) {
                    this.newbie_award = data.newbie_award;
                }
            }
        }
        get user_id() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set user_id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get token() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set token(value: string) {
            pb_1.Message.setField(this, 2, value);
        }

        /** 
          新增或者升级
           **/
        get newbie_type() {
            return pb_1.Message.getFieldWithDefault(this, 4, NewbieType.NB_DEFAULT) as NewbieType;
        }

        /** 
          新增或者升级
           **/
        set newbie_type(value: NewbieType) {
            pb_1.Message.setField(this, 4, value);
        }
        get newbie_award() {
            return pb_1.Message.getFieldWithDefault(this, 5, 0) as number;
        }
        set newbie_award(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data: {
            user_id?: number;
            token?: string;
            newbie_type?: NewbieType;
            newbie_award?: number;
        }): LoginInfo {
            const message = new LoginInfo({});
            if (data.user_id != null) {
                message.user_id = data.user_id;
            }
            if (data.token != null) {
                message.token = data.token;
            }
            if (data.newbie_type != null) {
                message.newbie_type = data.newbie_type;
            }
            if (data.newbie_award != null) {
                message.newbie_award = data.newbie_award;
            }
            return message;
        }
        toObject() {
            const data: {
                user_id?: number;
                token?: string;
                newbie_type?: NewbieType;
                newbie_award?: number;
            } = {};
            if (this.user_id != null) {
                data.user_id = this.user_id;
            }
            if (this.token != null) {
                data.token = this.token;
            }
            if (this.newbie_type != null) {
                data.newbie_type = this.newbie_type;
            }
            if (this.newbie_award != null) {
                data.newbie_award = this.newbie_award;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.user_id != 0) writer.writeInt64(1, this.user_id);
            if (this.token.length) writer.writeString(2, this.token);
            if (this.newbie_type != NewbieType.NB_DEFAULT) writer.writeEnum(4, this.newbie_type);
            if (this.newbie_award != 0) writer.writeInt64(5, this.newbie_award);
            if (!w) return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): LoginInfo {
            const reader =
                    bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes),
                message = new LoginInfo();
            while (reader.nextField()) {
                if (reader.isEndGroup()) break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.user_id = reader.readInt64();
                        break;
                    case 2:
                        message.token = reader.readString();
                        break;
                    case 4:
                        message.newbie_type = reader.readEnum();
                        break;
                    case 5:
                        message.newbie_award = reader.readInt64();
                        break;
                    default:
                        reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): LoginInfo {
            return LoginInfo.deserialize(bytes);
        }
    }
}
