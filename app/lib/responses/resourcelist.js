'use strict';

function ResourceListResponse() {}

ResourceListResponse.build = function(rows, count, offset) {
  var resp = new ResourceListResponse();
  resp.items = rows;
  resp.isTruncated = (offset + rows.length) < count;
  resp.totalItems = count;

  return resp;
};


module.exports = ResourceListResponse;
