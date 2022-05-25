import ValidationService from "@/services/ValidationService";
import GeneralServices from "@/services/GeneralServices";
import { NumberFieldEnum } from "@/shared/enums/NumberFieldEnum";
export default {
  name: "NumberField",
  data: () => ({
    validationService: new ValidationService(),
    generalServices: new GeneralServices(),
    numberFieldEnum: NumberFieldEnum
  }),
  computed: {
    value: {
      get() {
        if (this.Disabled && typeof this.FieldValue === "number") {
          return this.FieldValue.toFixed(2);
        }
        return this.FieldValue;
      },
      set(newValue) {
        if (newValue === null || newValue === "") {
          this.$emit("update", 0);
        } else if (this.Type === this.numberFieldEnum.Score) {
          this.$emit("update", parseInt(newValue));
        } else {
          this.$emit("update", parseFloat(newValue));
        }
      }
    }
  },
  props: {
    FieldTitle: String,
    FieldValue: Number,
    Type: {
      type: Number,
      default: NumberFieldEnum.Score
    },
    Required: {
      type: Boolean,
      default: true
    },
    Disabled: {
      type: Boolean,
      default: false
    }
  }
};
