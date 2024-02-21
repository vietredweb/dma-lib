import BaseItemModel from '../../Abstract/BaseItemModel';
import BaseModel from '../../Abstract/BaseModel';
import { PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY } from '../../Constant/PimConstant';

class PropertyValueModel extends BaseModel {
  constructor(entities: any) {
    super(entities);
    if (entities) {
      this.items = entities._embedded.item.map((element: any) => {
        return new PropertyValueItemModel(element);
      });
    }
  }
}
class PropertyValueItemModel extends BaseItemModel {
  id: any = null;
  title: any = null;
  published = 0;
  featured = 0;
  created_user_name = null;
  modified_user_name = null;
  publish_up = null;
  modified_time = null;
  created_time = null;
  custom_fields: any = null;
  properties: any = null;

  constructor(entity: any) {
    super(entity);
    if (entity) {
      this.id = entity[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.ID] ?? '';
      this.title = entity[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.TITLE] ?? '';
      this.published = entity[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.PUBLISHED] ?? 0;
      this.featured = entity[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.FEATURED] ?? 0;
      this.created_time = entity[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CREATED_TIME] ?? '';
      this.created_user_name = entity[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CREATED_USER_NAME] ?? '';
      this.modified_user_name =
        entity[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.MODIFIED_USER_NAME] ?? '';
      this.publish_up = entity[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.PUBLISH_UP] ?? '';
      this.modified_time = entity[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.MODIFIED_TIME] ?? '';
      this.custom_fields = entity[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS] ?? '';
      this.properties = entity[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.PROPERTIES] ?? '';
    }
  }

  toObject = () => {
    return {};
  };

  isJsonString = (str: any) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  toJSON = () => {
    return {
      ...this.baseToJSON(),
      [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.ID]: this.id,
      [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.TITLE]: this.title,
      [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.PUBLISHED]: this.published,
      [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.FEATURED]: this.featured,
      [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CREATED_TIME]: this.created_time,
      [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CREATED_USER_NAME]: this.created_user_name,
      [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.MODIFIED_USER_NAME]: this.modified_user_name,
      [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.PUBLISH_UP]: this.publish_up,
      [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.MODIFIED_TIME]: this.modified_time,
      [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: this.custom_fields,
      [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.PROPERTIES]: this.properties,
    };
  };

  static __transformItemToApiOfCreation = (data: any) => {
    let formData = new FormData();

    const excluded = [
      PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.ID,
      PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS,
    ];

    Object.keys(PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY).forEach((index) => {
      if (
        !excluded.includes(PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY[index]) &&
        data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY[index]]
      ) {
        formData.append(
          PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY[index],
          data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY[index]]
        );
      }
    });
    if (
      data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS] &&
      Object.keys(data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS]).length
    ) {
      Object.keys(data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS]).forEach(function (key) {
        if (Array.isArray(data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS][key])) {
          data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS][key].map(
            (field: any, index: any) => {
              if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
                Object.keys(field).forEach(function (fieldKey) {
                  return formData.append(
                    [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS] +
                      `[${key}][${index}][${fieldKey}]`,
                    field[fieldKey]
                  );
                });
              } else {
                return formData.append(
                  [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS] +
                    '[' +
                    key +
                    '][' +
                    index +
                    ']',
                  field
                );
              }
            }
          );
        } else {
          formData.append(
            [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS] + '[' + key + ']',
            data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS][key]
          );
        }
      });
    }

    return formData;
  };

  static __transformItemToApiOfUpdation = (data: any) => {
    let formData: any = {};
    const excluded = [PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS];
    Object.keys(PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY).forEach((index) => {
      if (
        !excluded.includes(PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY[index]) &&
        data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY[index]]
      ) {
        formData[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY[index]] =
          data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY[index]];
      }
    });

    if (
      data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS] &&
      Object.keys(data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS]).length
    ) {
      formData[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS] = {};
      Object.keys(data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS]).forEach(function (key) {
        formData[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS][key] =
          data[PIM_PROPERTY_VALUE_DETAIL_FIELD_KEY.CUSTOM_FIELDS][key];
      });
    }
    return formData;
  };
}

export { PropertyValueModel, PropertyValueItemModel };
