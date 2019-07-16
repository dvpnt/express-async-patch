require('./');

const t = require('tap');
const express = require('express');
const request = require('supertest');

t.test('express-async-patch', async (t) => {
	await t.test('still working in old way', async (t) => {
		t.plan(3);

		const app = express();

		app.get('/', () => {
			throw new Error('thrown error');
		});

		// eslint-disable-next-line no-unused-vars
		app.use((err, req, res, next) => {
			t.is(err.message, 'thrown error');

			res.json({error: err.message});
		});

		const {body, statusCode} = await request(app).get('/');

		t.strictSame(body, {error: 'thrown error'});
		t.is(statusCode, 200);
	});

	await t.test('catch error in async handler', async (t) => {
		t.plan(3);

		const app = express();

		app.get('/', async () => {
			await Promise.reject(new Error('async error'));
		});

		// eslint-disable-next-line no-unused-vars
		app.use((err, req, res, next) => {
			t.is(err.message, 'async error');

			res.json({error: err.message});
		});

		const {body, statusCode} = await request(app).get('/');

		t.strictSame(body, {error: 'async error'});
		t.is(statusCode, 200);
	});

	await t.test('async error middleware', async (t) => {
		t.plan(3);

		const app = express();

		app.get('/', () => {
			throw new Error('thrown error');
		});

		// eslint-disable-next-line no-unused-vars
		app.use(async (err, req, res, next) => {
			await Promise.resolve(42);

			t.is(err.message, 'thrown error');

			res.json({error: err.message});
		});

		const {body, statusCode} = await request(app).get('/');

		t.strictSame(body, {error: 'thrown error'});
		t.is(statusCode, 200);
	});
});
