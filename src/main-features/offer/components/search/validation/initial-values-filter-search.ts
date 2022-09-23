import * as Yup from "yup";
import { IAddress } from "../../../../../shared/model/address.model";

export const initialValuesFilterSearch = {
  address: {} as IAddress,
};

export const validationSchemFilterSearch = Yup.object({
  address: Yup.object().nullable().notRequired().default({}),
});
