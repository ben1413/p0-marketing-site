--[[
  CreatorFloor — minimal telemetry helper for Roblox experiences.
  Place in ServerScriptService. Set INGEST_URL to your deployed CF origin + /api/v1/telemetry/ingest
  and optional CF_TELEMETRY_SECRET as x-cf-secret header value.
]]

local HttpService = game:GetService("HttpService")

local CONFIG = {
	ingestUrl = "https://YOUR_CF_ORIGIN/api/v1/telemetry/ingest",
	secret = "", -- optional; matches CF_TELEMETRY_SECRET on server
	gameId = "", -- universe id or place id string you use in CreatorFloor
}

local function post(payload: { [string]: any })
	if CONFIG.ingestUrl == "" or CONFIG.ingestUrl:find("YOUR_CF_ORIGIN") then
		warn("[CreatorFloor] Set CONFIG.ingestUrl")
		return
	end
	local body = HttpService:JSONEncode(payload)
	local headers = {
		["Content-Type"] = "application/json",
	}
	if CONFIG.secret ~= "" then
		headers["x-cf-secret"] = CONFIG.secret
	end
	pcall(function()
		HttpService:PostAsync(CONFIG.ingestUrl, body, Enum.HttpContentType.ApplicationJson, false, headers)
	end)
end

local CreatorFloorTelemetry = {}

function CreatorFloorTelemetry.metric(name: string, data: { [string]: any }?)
	post({
		gameId = CONFIG.gameId,
		event = name,
		t = os.time(),
		data = data or {},
	})
end

return CreatorFloorTelemetry
