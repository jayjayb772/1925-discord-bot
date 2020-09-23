## What is this?
The discord bot for our discord server

## Where is it being hosted???
Good try, I'm not putting the API link here, silly! You can host it yourself! I will make a list of required environment variables soon!
I'm using digital ocean droplets though!


## Why'd you do this?
Because I never found a display board with enough customizability for me. Also I wanted to make a microservice based API on my own and I never really had the chance to learn react

[Orchestrator](https://github.com/jayjayb772/Display-orchestrator)

[CTAPI](https://github.com/jayjayb772/Display-CTAPI)

[WeatherAPI](https://github.com/jayjayb772/Display-Weather)

[DiscordBot](https://github.com/jayjayb772/1925-discord-bot)





# discord-bot
My second! discord bot. Written in Javascript with NodeJs and DiscordJs
Has auto-moderation and sends flagged messages to managers set in the environment variables.
# Commands
**In order to use commands you must start with the set prefix. In this bot it is "1925!".** \
*ex; "1925!residents" will give all residents online*

**Regular use commands**

Command | Action | Optional Tags | Optional Tag functionality | Currently functional
--------|--------|---------------|--------------------------- | --------------------
**say (embed) str** | Repeats back Str | embed | embeds Str | **YES**
**quote** | Pulls random quote from [Adafruits quote API page](adafruit.com/quotes.php) | *N/A* | *N/A* | **YES**
**poll (prev ID)** | leads you through instructions to make reaction polls | prev_id | Message ID of a previous poll to get winner | **YES**
**residents** | Lists Residents on | *N/A* | *N/A* | **YES**
**bug (report)** | allows you to report a bug to set user easily | report | Enter a description of the bug and what is wrong to the best of your ability | **YES**
**help** | Lists all commands | *N/A* | *N/A* | **YES**

**Music channel commands**

Command | Action | Optional Tags | Optional Tag functionality | Currently functional
--------|--------|---------------|--------------------------- | --------------------
**play (link)** | adds song from youtube link to music queue | link | youtube link, maximum 5 minutes | **NO**
**skip** | skips current song | *N/A* | *N/A* | **NO**
**pause** | pauses song where its at | *N/A* | *N/A* | **NO**
**stop** | stops music bot from playing and clears queue | *N/A* | *N/A* | **NO**

For comments, questions or suggestions please contact J B through discord or comment on this github repo.


# Dev notes
I'm working on learning the DiscordJs package and making discord bots. This is my first real discord bot project so it will take some time to work out bugs and get it to full functionality. I'm using **dotenv** for bot token and other api secrets storage to keep them off github and make switching between testing and production much simpler. The bot has Auto-moderator features that will flag messages with banned words and send a notification to managers.

[Discordjs cheat sheet](https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584)

# TODO for the future:
