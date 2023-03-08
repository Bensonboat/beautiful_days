import axios from "./interceptors";
import * as apiUrl from "./api-url";

export interface IFetchTrendingTagsParams {
  inname: string;
}

const API = {
  getTrendingTags(dynamicParams?: IFetchTrendingTagsParams) {
    const staticParams = {
      order: "desc",
      sort: "activity",
      site: "stackoverflow",
      pagesize: 10,
    };

    const params = {
      ...staticParams,
      ...dynamicParams,
    };

    return axios({
      method: "GET",
      url: `${apiUrl.TAG}`,
      params,
    });
  },
  getQuestions(dynamicParams: { page: number; tagged: string }) {
    const staticParams = {
      order: "desc",
      sort: "activity",
      site: "stackoverflow",
      pagesize: 20,
    };

    const params = {
      ...staticParams,
      page: dynamicParams.page,
      tagged: dynamicParams.tagged,
    };

    return axios({
      method: "GET",
      url: `${apiUrl.QUESTION}`,
      params,
    });
  },
};

export default API;
