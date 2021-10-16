const sinon = require("sinon");
const { describe, it, afterEach } = require("mocha");
const { expect } = require("chai");
const mocks = require("node-mocks-http");
const logger = require("../../utils/logger");


const {
	testControllerPost,
} = require("../../Controllers/Test-Controller/post");

describe("Controller:Test-Controller:post", () => {
	const res = mocks.createResponse();
	const reqMockPayload = {
		method: "POST",
		url: "/test",
	};
	afterEach((done) => {
		sinon.restore();

		done();
	});
	it("Post Action:Throws Bad Request response when request body is empty", async () => {
		reqMockPayload.body = {};
		const req = mocks.createRequest(reqMockPayload);
		try {
			const logSpyError = sinon.spy(logger,"error");
			const response = await testControllerPost(req, res);
			expect(logSpyError.calledWith(`Request body is invalid:${reqMockPayload.body}`)).eql(true);
			expect(response).to.be.undefined;
		} catch (err) {
			expect(err).to.be.undefined;
		}
	});

	it("Post Action:Happy path", async () => {
		reqMockPayload.body = {
			clientId:"1234"
		};
		const req = mocks.createRequest(reqMockPayload);
		const logSpy = sinon.spy(logger,"info");
		try {
			const response = await testControllerPost(req, res);
			expect(logSpy.calledWith(`***********Created Connection with client_id:${reqMockPayload.body.clientId}**********`)).eql(true);
			expect(response).to.be.undefined;
		} catch (err) {
			expect(err).to.be.undefined;
		}
	});

});
