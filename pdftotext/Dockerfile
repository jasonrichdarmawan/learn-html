FROM alpine:3.16

RUN apk add poppler-utils=22.05.0-r0

FROM scratch

WORKDIR /

# $ ldd pdftotext
COPY --from=0 /lib/ld-musl-aarch64.so.1 \
/lib/ld-musl-aarch64.so.1 \
/lib/libz.so.1 \
/lib/
COPY --from=0 /usr/lib/libpoppler.so.121 \
/usr/lib/libstdc++.so.6 \
usr/lib/libfreetype.so.6 \
/usr/lib/libfontconfig.so.1 \
/usr/lib/libjpeg.so.8 \
/usr/lib/libopenjp2.so.7 \
/usr/lib/liblcms2.so.2 \
/usr/lib/libpng16.so.16 \
/usr/lib/libtiff.so.5 \
usr/lib/libgcc_s.so.1 \
/usr/lib/libbz2.so.1 \
/usr/lib/libbrotlidec.so.1 \
/usr/lib/libexpat.so.1 \
usr/lib/libwebp.so.7 \
/usr/lib/libzstd.so.1 \
/usr/lib/liblzma.so.5 \
/usr/lib/libbrotlicommon.so.1 \
/usr/lib/
COPY --from=0 /usr/bin/pdftotext /usr/bin/pdftotext