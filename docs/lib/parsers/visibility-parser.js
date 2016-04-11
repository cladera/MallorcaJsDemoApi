/**
 * Created by marc-vancast on 29/03/16.
 */

function parse(content) {
  return {visibility: content.replace(/^\s*|\s*$/g, '')};
}


/**
 * Exports
 */
module.exports = {
  parse         : parse,
  path          : 'local',
  method        : 'insert'
};
