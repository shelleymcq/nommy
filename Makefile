repo = pevanscfi

build:
	cd server && docker build --platform linux/amd64 -t $(repo)/nommy-server .
	cd client && docker build --platform linux/amd64 -t $(repo)/nommy-web . -f Dockerfile.prod

push:
	docker push $(repo)/nommy-server	
	docker push $(repo)/nommy-web

