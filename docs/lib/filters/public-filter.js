/**
 * Created by marc-vancast on 29/03/16.
 */
/**
 * Post Filter parsed results
 *
 * @param {Object[]} parsedFiles
 * @returns {Object}
 */
function postFilter(parsedFiles) {

  parsedFiles.forEach(function(parsedFile) {
    parsedFile.forEach(function(block) {
      if (block.local.visibility !== 'public'){
          block.local = {};
      }
    });
  });
}

/**
 * Exports
 */
module.exports = {
  postFilter: postFilter
};
