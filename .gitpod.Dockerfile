FROM gitpod/workspace-full

USER gitpod

# install deno
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
RUN /home/gitpod/.deno/bin/deno completions bash > /home/gitpod/.bashrc.d/90-deno && echo 'export PATH="/home/gitpod/.deno/bin:$PATH"' >> /home/gitpod/.bashrc.d/90-deno