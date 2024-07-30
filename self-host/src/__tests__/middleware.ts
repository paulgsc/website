/*
 *
 * set up tests for middleware
 * 1.) verify that all middlware runs for all routes
 * 2.) verify that if referrer param is set we get role from token and verify that existing jtw has that role
 * 3.) verify that if no existing jwt in cookie and referrer is set we run action new and create jwt with role from referrer
 * 4.) verify that if no existing jwt and referrer is not set we create jwt with role 'unkown'
 * 5.) verify that if referrer param is not set and jwt exists in cookie, if jwt is valid we run action keep and stay as is
 * 6.) verify that if referrer param is not set and jwt exists but is expired we  run action refresh
 * 7.) verify that we do not run multiple actions all actions are mutualy exclusive
 *
 *
 *
 */
