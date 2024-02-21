/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirXApiInstance from '../../Gateway/Instance';
import BaseRoute from '../../Abstract/BaseRoute';
import Utils from '../../Utils/Utils';

class PimVariantRoute extends BaseRoute {
  option = 'reditem-item_variant_53';

  getList = (filters: any) => {
    const buildFilters = Utils.createFilters(filters);

    return AesirXApiInstance.get(
      this.createRequestURL({
        option: this.option,
        ...buildFilters,
      })
    );
  };

  create = (data: any) => {
    return AesirXApiInstance.post(
      this.createRequestURL({
        option: this.option,
      }),
      data
    );
  };

  update = (data: any) => {
    return AesirXApiInstance.put(
      this.createRequestURL({
        option: this.option,
      }),
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  };

  delete = (ids: any) => {
    return AesirXApiInstance.delete(
      this.createRequestURL({
        option: this.option,
      }),
      {
        data: { ids: Array.isArray(ids) ? ids : [ids] },
      }
    );
  };

  getDetail = (id = 0, dataFilter = {}) => {
    return AesirXApiInstance.get(
      this.createRequestURL({
        option: this.option,
        id: id,
        ...dataFilter,
      })
    );
  };
}

export default PimVariantRoute;
