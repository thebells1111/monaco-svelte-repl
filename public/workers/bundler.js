(function() {
  "use strict";

  /*
	  @license
		Rollup.js v1.27.0
		Tue, 12 Nov 2019 16:32:46 GMT - commit 4b786457bb425baf8fbd786c527bd9bc34b568e4


		https://github.com/rollup/rollup

		Released under the MIT License.
	*/
  /*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
  function e(e, t, s, n) {
    return new (s || (s = Promise))(function(i, r) {
      function a(e) {
        try {
          h(n.next(e));
        } catch (e) {
          r(e);
        }
      }
      function o(e) {
        try {
          h(n.throw(e));
        } catch (e) {
          r(e);
        }
      }
      function h(e) {
        e.done
          ? i(e.value)
          : new s(function(t) {
              t(e.value);
            }).then(a, o);
      }
      h((n = n.apply(e, t || [])).next());
    });
  }
  for (
    var t = "1.27.0",
      s = {},
      n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      i = 0;
    i < n.length;
    i++
  )
    s[n.charCodeAt(i)] = i;
  function r(e) {
    var t = "";
    e = e < 0 ? (-e << 1) | 1 : e << 1;
    do {
      var s = 31 & e;
      (e >>>= 5) > 0 && (s |= 32), (t += n[s]);
    } while (e > 0);
    return t;
  }
  var a = function(e, t, s) {
    (this.start = e),
      (this.end = t),
      (this.original = s),
      (this.intro = ""),
      (this.outro = ""),
      (this.content = s),
      (this.storeName = !1),
      (this.edited = !1),
      Object.defineProperties(this, {
        previous: { writable: !0, value: null },
        next: { writable: !0, value: null },
      });
  };
  (a.prototype.appendLeft = function(e) {
    this.outro += e;
  }),
    (a.prototype.appendRight = function(e) {
      this.intro = this.intro + e;
    }),
    (a.prototype.clone = function() {
      var e = new a(this.start, this.end, this.original);
      return (
        (e.intro = this.intro),
        (e.outro = this.outro),
        (e.content = this.content),
        (e.storeName = this.storeName),
        (e.edited = this.edited),
        e
      );
    }),
    (a.prototype.contains = function(e) {
      return this.start < e && e < this.end;
    }),
    (a.prototype.eachNext = function(e) {
      for (var t = this; t; ) e(t), (t = t.next);
    }),
    (a.prototype.eachPrevious = function(e) {
      for (var t = this; t; ) e(t), (t = t.previous);
    }),
    (a.prototype.edit = function(e, t, s) {
      return (
        (this.content = e),
        s || ((this.intro = ""), (this.outro = "")),
        (this.storeName = t),
        (this.edited = !0),
        this
      );
    }),
    (a.prototype.prependLeft = function(e) {
      this.outro = e + this.outro;
    }),
    (a.prototype.prependRight = function(e) {
      this.intro = e + this.intro;
    }),
    (a.prototype.split = function(e) {
      var t = e - this.start,
        s = this.original.slice(0, t),
        n = this.original.slice(t);
      this.original = s;
      var i = new a(e, this.end, n);
      return (
        (i.outro = this.outro),
        (this.outro = ""),
        (this.end = e),
        this.edited
          ? (i.edit("", !1), (this.content = ""))
          : (this.content = s),
        (i.next = this.next),
        i.next && (i.next.previous = i),
        (i.previous = this),
        (this.next = i),
        i
      );
    }),
    (a.prototype.toString = function() {
      return this.intro + this.content + this.outro;
    }),
    (a.prototype.trimEnd = function(e) {
      if (((this.outro = this.outro.replace(e, "")), this.outro.length))
        return !0;
      var t = this.content.replace(e, "");
      return t.length
        ? (t !== this.content &&
            this.split(this.start + t.length).edit("", void 0, !0),
          !0)
        : (this.edit("", void 0, !0),
          (this.intro = this.intro.replace(e, "")),
          !!this.intro.length || void 0);
    }),
    (a.prototype.trimStart = function(e) {
      if (((this.intro = this.intro.replace(e, "")), this.intro.length))
        return !0;
      var t = this.content.replace(e, "");
      return t.length
        ? (t !== this.content &&
            (this.split(this.end - t.length), this.edit("", void 0, !0)),
          !0)
        : (this.edit("", void 0, !0),
          (this.outro = this.outro.replace(e, "")),
          !!this.outro.length || void 0);
    });
  var o = function() {
    throw new Error(
      "Unsupported environment: `window.btoa` or `Buffer` should be supported."
    );
  };
  "undefined" != typeof window && "function" == typeof window.btoa
    ? (o = function(e) {
        return window.btoa(unescape(encodeURIComponent(e)));
      })
    : "function" == typeof Buffer &&
      (o = function(e) {
        return Buffer.from(e, "utf-8").toString("base64");
      });
  var h = function(e) {
    (this.version = 3),
      (this.file = e.file),
      (this.sources = e.sources),
      (this.sourcesContent = e.sourcesContent),
      (this.names = e.names),
      (this.mappings = (function(e) {
        for (var t = 0, s = 0, n = 0, i = 0, a = "", o = 0; o < e.length; o++) {
          var h = e[o];
          if ((o > 0 && (a += ";"), 0 !== h.length)) {
            for (var l = 0, c = [], u = 0, d = h; u < d.length; u++) {
              var p = d[u],
                f = r(p[0] - l);
              (l = p[0]),
                p.length > 1 &&
                  ((f += r(p[1] - t) + r(p[2] - s) + r(p[3] - n)),
                  (t = p[1]),
                  (s = p[2]),
                  (n = p[3])),
                5 === p.length && ((f += r(p[4] - i)), (i = p[4])),
                c.push(f);
            }
            a += c.join(",");
          }
        }
        return a;
      })(e.mappings));
  };
  function l(e) {
    var t = e.split("\n"),
      s = t.filter(function(e) {
        return /^\t+/.test(e);
      }),
      n = t.filter(function(e) {
        return /^ {2,}/.test(e);
      });
    if (0 === s.length && 0 === n.length) return null;
    if (s.length >= n.length) return "\t";
    var i = n.reduce(function(e, t) {
      var s = /^ +/.exec(t)[0].length;
      return Math.min(s, e);
    }, 1 / 0);
    return new Array(i + 1).join(" ");
  }
  function c(e, t) {
    var s = e.split(/[/\\]/),
      n = t.split(/[/\\]/);
    for (s.pop(); s[0] === n[0]; ) s.shift(), n.shift();
    if (s.length) for (var i = s.length; i--; ) s[i] = "..";
    return s.concat(n).join("/");
  }
  (h.prototype.toString = function() {
    return JSON.stringify(this);
  }),
    (h.prototype.toUrl = function() {
      return "data:application/json;charset=utf-8;base64," + o(this.toString());
    });
  var u = Object.prototype.toString;
  function d(e) {
    return "[object Object]" === u.call(e);
  }
  function p(e) {
    for (var t = e.split("\n"), s = [], n = 0, i = 0; n < t.length; n++)
      s.push(i), (i += t[n].length + 1);
    return function(e) {
      for (var t = 0, n = s.length; t < n; ) {
        var i = (t + n) >> 1;
        e < s[i] ? (n = i) : (t = i + 1);
      }
      var r = t - 1;
      return { line: r, column: e - s[r] };
    };
  }
  var f = function(e) {
    (this.hires = e),
      (this.generatedCodeLine = 0),
      (this.generatedCodeColumn = 0),
      (this.raw = []),
      (this.rawSegments = this.raw[this.generatedCodeLine] = []),
      (this.pending = null);
  };
  (f.prototype.addEdit = function(e, t, s, n) {
    if (t.length) {
      var i = [this.generatedCodeColumn, e, s.line, s.column];
      n >= 0 && i.push(n), this.rawSegments.push(i);
    } else this.pending && this.rawSegments.push(this.pending);
    this.advance(t), (this.pending = null);
  }),
    (f.prototype.addUneditedChunk = function(e, t, s, n, i) {
      for (var r = t.start, a = !0; r < t.end; )
        (this.hires || a || i[r]) &&
          this.rawSegments.push([
            this.generatedCodeColumn,
            e,
            n.line,
            n.column,
          ]),
          "\n" === s[r]
            ? ((n.line += 1),
              (n.column = 0),
              (this.generatedCodeLine += 1),
              (this.raw[this.generatedCodeLine] = this.rawSegments = []),
              (this.generatedCodeColumn = 0))
            : ((n.column += 1), (this.generatedCodeColumn += 1)),
          (r += 1),
          (a = !1);
      this.pending = [this.generatedCodeColumn, e, n.line, n.column];
    }),
    (f.prototype.advance = function(e) {
      if (e) {
        var t = e.split("\n");
        if (t.length > 1) {
          for (var s = 0; s < t.length - 1; s++)
            this.generatedCodeLine++,
              (this.raw[this.generatedCodeLine] = this.rawSegments = []);
          this.generatedCodeColumn = 0;
        }
        this.generatedCodeColumn += t[t.length - 1].length;
      }
    });
  var m = "\n",
    g = { insertLeft: !1, insertRight: !1, storeName: !1 },
    x = function(e, t) {
      void 0 === t && (t = {});
      var s = new a(0, e.length, e);
      Object.defineProperties(this, {
        original: { writable: !0, value: e },
        outro: { writable: !0, value: "" },
        intro: { writable: !0, value: "" },
        firstChunk: { writable: !0, value: s },
        lastChunk: { writable: !0, value: s },
        lastSearchedChunk: { writable: !0, value: s },
        byStart: { writable: !0, value: {} },
        byEnd: { writable: !0, value: {} },
        filename: { writable: !0, value: t.filename },
        indentExclusionRanges: { writable: !0, value: t.indentExclusionRanges },
        sourcemapLocations: { writable: !0, value: {} },
        storedNames: { writable: !0, value: {} },
        indentStr: { writable: !0, value: l(e) },
      }),
        (this.byStart[0] = s),
        (this.byEnd[e.length] = s);
    };
  (x.prototype.addSourcemapLocation = function(e) {
    this.sourcemapLocations[e] = !0;
  }),
    (x.prototype.append = function(e) {
      if ("string" != typeof e)
        throw new TypeError("outro content must be a string");
      return (this.outro += e), this;
    }),
    (x.prototype.appendLeft = function(e, t) {
      if ("string" != typeof t)
        throw new TypeError("inserted content must be a string");
      this._split(e);
      var s = this.byEnd[e];
      return s ? s.appendLeft(t) : (this.intro += t), this;
    }),
    (x.prototype.appendRight = function(e, t) {
      if ("string" != typeof t)
        throw new TypeError("inserted content must be a string");
      this._split(e);
      var s = this.byStart[e];
      return s ? s.appendRight(t) : (this.outro += t), this;
    }),
    (x.prototype.clone = function() {
      for (
        var e = new x(this.original, { filename: this.filename }),
          t = this.firstChunk,
          s = (e.firstChunk = e.lastSearchedChunk = t.clone());
        t;

      ) {
        (e.byStart[s.start] = s), (e.byEnd[s.end] = s);
        var n = t.next,
          i = n && n.clone();
        i && ((s.next = i), (i.previous = s), (s = i)), (t = n);
      }
      return (
        (e.lastChunk = s),
        this.indentExclusionRanges &&
          (e.indentExclusionRanges = this.indentExclusionRanges.slice()),
        Object.keys(this.sourcemapLocations).forEach(function(t) {
          e.sourcemapLocations[t] = !0;
        }),
        (e.intro = this.intro),
        (e.outro = this.outro),
        e
      );
    }),
    (x.prototype.generateDecodedMap = function(e) {
      var t = this;
      e = e || {};
      var s = Object.keys(this.storedNames),
        n = new f(e.hires),
        i = p(this.original);
      return (
        this.intro && n.advance(this.intro),
        this.firstChunk.eachNext(function(e) {
          var r = i(e.start);
          e.intro.length && n.advance(e.intro),
            e.edited
              ? n.addEdit(
                  0,
                  e.content,
                  r,
                  e.storeName ? s.indexOf(e.original) : -1
                )
              : n.addUneditedChunk(0, e, t.original, r, t.sourcemapLocations),
            e.outro.length && n.advance(e.outro);
        }),
        {
          file: e.file ? e.file.split(/[/\\]/).pop() : null,
          sources: [e.source ? c(e.file || "", e.source) : null],
          sourcesContent: e.includeContent ? [this.original] : [null],
          names: s,
          mappings: n.raw,
        }
      );
    }),
    (x.prototype.generateMap = function(e) {
      return new h(this.generateDecodedMap(e));
    }),
    (x.prototype.getIndentString = function() {
      return null === this.indentStr ? "\t" : this.indentStr;
    }),
    (x.prototype.indent = function(e, t) {
      var s = /^[^\r\n]/gm;
      if (
        (d(e) && ((t = e), (e = void 0)),
        "" === (e = void 0 !== e ? e : this.indentStr || "\t"))
      )
        return this;
      var n = {};
      (t = t || {}).exclude &&
        ("number" == typeof t.exclude[0] ? [t.exclude] : t.exclude).forEach(
          function(e) {
            for (var t = e[0]; t < e[1]; t += 1) n[t] = !0;
          }
        );
      var i = !1 !== t.indentStart,
        r = function(t) {
          return i ? "" + e + t : ((i = !0), t);
        };
      this.intro = this.intro.replace(s, r);
      for (var a = 0, o = this.firstChunk; o; ) {
        var h = o.end;
        if (o.edited)
          n[a] ||
            ((o.content = o.content.replace(s, r)),
            o.content.length && (i = "\n" === o.content[o.content.length - 1]));
        else
          for (a = o.start; a < h; ) {
            if (!n[a]) {
              var l = this.original[a];
              "\n" === l
                ? (i = !0)
                : "\r" !== l &&
                  i &&
                  ((i = !1),
                  a === o.start
                    ? o.prependRight(e)
                    : (this._splitChunk(o, a), (o = o.next).prependRight(e)));
            }
            a += 1;
          }
        (a = o.end), (o = o.next);
      }
      return (this.outro = this.outro.replace(s, r)), this;
    }),
    (x.prototype.insert = function() {
      throw new Error(
        "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
      );
    }),
    (x.prototype.insertLeft = function(e, t) {
      return (
        g.insertLeft ||
          (console.warn(
            "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
          ),
          (g.insertLeft = !0)),
        this.appendLeft(e, t)
      );
    }),
    (x.prototype.insertRight = function(e, t) {
      return (
        g.insertRight ||
          (console.warn(
            "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
          ),
          (g.insertRight = !0)),
        this.prependRight(e, t)
      );
    }),
    (x.prototype.move = function(e, t, s) {
      if (s >= e && s <= t)
        throw new Error("Cannot move a selection inside itself");
      this._split(e), this._split(t), this._split(s);
      var n = this.byStart[e],
        i = this.byEnd[t],
        r = n.previous,
        a = i.next,
        o = this.byStart[s];
      if (!o && i === this.lastChunk) return this;
      var h = o ? o.previous : this.lastChunk;
      return (
        r && (r.next = a),
        a && (a.previous = r),
        h && (h.next = n),
        o && (o.previous = i),
        n.previous || (this.firstChunk = i.next),
        i.next || ((this.lastChunk = n.previous), (this.lastChunk.next = null)),
        (n.previous = h),
        (i.next = o || null),
        h || (this.firstChunk = n),
        o || (this.lastChunk = i),
        this
      );
    }),
    (x.prototype.overwrite = function(e, t, s, n) {
      if ("string" != typeof s)
        throw new TypeError("replacement content must be a string");
      for (; e < 0; ) e += this.original.length;
      for (; t < 0; ) t += this.original.length;
      if (t > this.original.length) throw new Error("end is out of bounds");
      if (e === t)
        throw new Error(
          "Cannot overwrite a zero-length range – use appendLeft or prependRight instead"
        );
      this._split(e),
        this._split(t),
        !0 === n &&
          (g.storeName ||
            (console.warn(
              "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
            ),
            (g.storeName = !0)),
          (n = { storeName: !0 }));
      var i = void 0 !== n && n.storeName,
        r = void 0 !== n && n.contentOnly;
      if (i) {
        var o = this.original.slice(e, t);
        this.storedNames[o] = !0;
      }
      var h = this.byStart[e],
        l = this.byEnd[t];
      if (h) {
        if (t > h.end && h.next !== this.byStart[h.end])
          throw new Error("Cannot overwrite across a split point");
        if ((h.edit(s, i, r), h !== l)) {
          for (var c = h.next; c !== l; ) c.edit("", !1), (c = c.next);
          c.edit("", !1);
        }
      } else {
        var u = new a(e, t, "").edit(s, i);
        (l.next = u), (u.previous = l);
      }
      return this;
    }),
    (x.prototype.prepend = function(e) {
      if ("string" != typeof e)
        throw new TypeError("outro content must be a string");
      return (this.intro = e + this.intro), this;
    }),
    (x.prototype.prependLeft = function(e, t) {
      if ("string" != typeof t)
        throw new TypeError("inserted content must be a string");
      this._split(e);
      var s = this.byEnd[e];
      return s ? s.prependLeft(t) : (this.intro = t + this.intro), this;
    }),
    (x.prototype.prependRight = function(e, t) {
      if ("string" != typeof t)
        throw new TypeError("inserted content must be a string");
      this._split(e);
      var s = this.byStart[e];
      return s ? s.prependRight(t) : (this.outro = t + this.outro), this;
    }),
    (x.prototype.remove = function(e, t) {
      for (; e < 0; ) e += this.original.length;
      for (; t < 0; ) t += this.original.length;
      if (e === t) return this;
      if (e < 0 || t > this.original.length)
        throw new Error("Character is out of bounds");
      if (e > t) throw new Error("end must be greater than start");
      this._split(e), this._split(t);
      for (var s = this.byStart[e]; s; )
        (s.intro = ""),
          (s.outro = ""),
          s.edit(""),
          (s = t > s.end ? this.byStart[s.end] : null);
      return this;
    }),
    (x.prototype.lastChar = function() {
      if (this.outro.length) return this.outro[this.outro.length - 1];
      var e = this.lastChunk;
      do {
        if (e.outro.length) return e.outro[e.outro.length - 1];
        if (e.content.length) return e.content[e.content.length - 1];
        if (e.intro.length) return e.intro[e.intro.length - 1];
      } while ((e = e.previous));
      return this.intro.length ? this.intro[this.intro.length - 1] : "";
    }),
    (x.prototype.lastLine = function() {
      var e = this.outro.lastIndexOf(m);
      if (-1 !== e) return this.outro.substr(e + 1);
      var t = this.outro,
        s = this.lastChunk;
      do {
        if (s.outro.length > 0) {
          if (-1 !== (e = s.outro.lastIndexOf(m)))
            return s.outro.substr(e + 1) + t;
          t = s.outro + t;
        }
        if (s.content.length > 0) {
          if (-1 !== (e = s.content.lastIndexOf(m)))
            return s.content.substr(e + 1) + t;
          t = s.content + t;
        }
        if (s.intro.length > 0) {
          if (-1 !== (e = s.intro.lastIndexOf(m)))
            return s.intro.substr(e + 1) + t;
          t = s.intro + t;
        }
      } while ((s = s.previous));
      return -1 !== (e = this.intro.lastIndexOf(m))
        ? this.intro.substr(e + 1) + t
        : this.intro + t;
    }),
    (x.prototype.slice = function(e, t) {
      for (
        void 0 === e && (e = 0), void 0 === t && (t = this.original.length);
        e < 0;

      )
        e += this.original.length;
      for (; t < 0; ) t += this.original.length;
      for (
        var s = "", n = this.firstChunk;
        n && (n.start > e || n.end <= e);

      ) {
        if (n.start < t && n.end >= t) return s;
        n = n.next;
      }
      if (n && n.edited && n.start !== e)
        throw new Error(
          "Cannot use replaced character " + e + " as slice start anchor."
        );
      for (var i = n; n; ) {
        !n.intro || (i === n && n.start !== e) || (s += n.intro);
        var r = n.start < t && n.end >= t;
        if (r && n.edited && n.end !== t)
          throw new Error(
            "Cannot use replaced character " + t + " as slice end anchor."
          );
        var a = i === n ? e - n.start : 0,
          o = r ? n.content.length + t - n.end : n.content.length;
        if (
          ((s += n.content.slice(a, o)),
          !n.outro || (r && n.end !== t) || (s += n.outro),
          r)
        )
          break;
        n = n.next;
      }
      return s;
    }),
    (x.prototype.snip = function(e, t) {
      var s = this.clone();
      return s.remove(0, e), s.remove(t, s.original.length), s;
    }),
    (x.prototype._split = function(e) {
      if (!this.byStart[e] && !this.byEnd[e])
        for (var t = this.lastSearchedChunk, s = e > t.end; t; ) {
          if (t.contains(e)) return this._splitChunk(t, e);
          t = s ? this.byStart[t.end] : this.byEnd[t.start];
        }
    }),
    (x.prototype._splitChunk = function(e, t) {
      if (e.edited && e.content.length) {
        var s = p(this.original)(t);
        throw new Error(
          "Cannot split a chunk that has already been edited (" +
            s.line +
            ":" +
            s.column +
            ' – "' +
            e.original +
            '")'
        );
      }
      var n = e.split(t);
      return (
        (this.byEnd[t] = e),
        (this.byStart[t] = n),
        (this.byEnd[n.end] = n),
        e === this.lastChunk && (this.lastChunk = n),
        (this.lastSearchedChunk = e),
        !0
      );
    }),
    (x.prototype.toString = function() {
      for (var e = this.intro, t = this.firstChunk; t; )
        (e += t.toString()), (t = t.next);
      return e + this.outro;
    }),
    (x.prototype.isEmpty = function() {
      var e = this.firstChunk;
      do {
        if (
          (e.intro.length && e.intro.trim()) ||
          (e.content.length && e.content.trim()) ||
          (e.outro.length && e.outro.trim())
        )
          return !1;
      } while ((e = e.next));
      return !0;
    }),
    (x.prototype.length = function() {
      var e = this.firstChunk,
        t = 0;
      do {
        t += e.intro.length + e.content.length + e.outro.length;
      } while ((e = e.next));
      return t;
    }),
    (x.prototype.trimLines = function() {
      return this.trim("[\\r\\n]");
    }),
    (x.prototype.trim = function(e) {
      return this.trimStart(e).trimEnd(e);
    }),
    (x.prototype.trimEndAborted = function(e) {
      var t = new RegExp((e || "\\s") + "+$");
      if (((this.outro = this.outro.replace(t, "")), this.outro.length))
        return !0;
      var s = this.lastChunk;
      do {
        var n = s.end,
          i = s.trimEnd(t);
        if (
          (s.end !== n &&
            (this.lastChunk === s && (this.lastChunk = s.next),
            (this.byEnd[s.end] = s),
            (this.byStart[s.next.start] = s.next),
            (this.byEnd[s.next.end] = s.next)),
          i)
        )
          return !0;
        s = s.previous;
      } while (s);
      return !1;
    }),
    (x.prototype.trimEnd = function(e) {
      return this.trimEndAborted(e), this;
    }),
    (x.prototype.trimStartAborted = function(e) {
      var t = new RegExp("^" + (e || "\\s") + "+");
      if (((this.intro = this.intro.replace(t, "")), this.intro.length))
        return !0;
      var s = this.firstChunk;
      do {
        var n = s.end,
          i = s.trimStart(t);
        if (
          (s.end !== n &&
            (s === this.lastChunk && (this.lastChunk = s.next),
            (this.byEnd[s.end] = s),
            (this.byStart[s.next.start] = s.next),
            (this.byEnd[s.next.end] = s.next)),
          i)
        )
          return !0;
        s = s.next;
      } while (s);
      return !1;
    }),
    (x.prototype.trimStart = function(e) {
      return this.trimStartAborted(e), this;
    });
  var y = Object.prototype.hasOwnProperty,
    E = function(e) {
      void 0 === e && (e = {}),
        (this.intro = e.intro || ""),
        (this.separator = void 0 !== e.separator ? e.separator : "\n"),
        (this.sources = []),
        (this.uniqueSources = []),
        (this.uniqueSourceIndexByFilename = {});
    };
  (E.prototype.addSource = function(e) {
    if (e instanceof x)
      return this.addSource({
        content: e,
        filename: e.filename,
        separator: this.separator,
      });
    if (!d(e) || !e.content)
      throw new Error(
        "bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`"
      );
    if (
      (["filename", "indentExclusionRanges", "separator"].forEach(function(t) {
        y.call(e, t) || (e[t] = e.content[t]);
      }),
      void 0 === e.separator && (e.separator = this.separator),
      e.filename)
    )
      if (y.call(this.uniqueSourceIndexByFilename, e.filename)) {
        var t = this.uniqueSources[
          this.uniqueSourceIndexByFilename[e.filename]
        ];
        if (e.content.original !== t.content)
          throw new Error(
            "Illegal source: same filename (" +
              e.filename +
              "), different contents"
          );
      } else
        (this.uniqueSourceIndexByFilename[
          e.filename
        ] = this.uniqueSources.length),
          this.uniqueSources.push({
            filename: e.filename,
            content: e.content.original,
          });
    return this.sources.push(e), this;
  }),
    (E.prototype.append = function(e, t) {
      return (
        this.addSource({
          content: new x(e),
          separator: (t && t.separator) || "",
        }),
        this
      );
    }),
    (E.prototype.clone = function() {
      var e = new E({ intro: this.intro, separator: this.separator });
      return (
        this.sources.forEach(function(t) {
          e.addSource({
            filename: t.filename,
            content: t.content.clone(),
            separator: t.separator,
          });
        }),
        e
      );
    }),
    (E.prototype.generateDecodedMap = function(e) {
      var t = this;
      void 0 === e && (e = {});
      var s = [];
      this.sources.forEach(function(e) {
        Object.keys(e.content.storedNames).forEach(function(e) {
          ~s.indexOf(e) || s.push(e);
        });
      });
      var n = new f(e.hires);
      return (
        this.intro && n.advance(this.intro),
        this.sources.forEach(function(e, i) {
          i > 0 && n.advance(t.separator);
          var r = e.filename ? t.uniqueSourceIndexByFilename[e.filename] : -1,
            a = e.content,
            o = p(a.original);
          a.intro && n.advance(a.intro),
            a.firstChunk.eachNext(function(t) {
              var i = o(t.start);
              t.intro.length && n.advance(t.intro),
                e.filename
                  ? t.edited
                    ? n.addEdit(
                        r,
                        t.content,
                        i,
                        t.storeName ? s.indexOf(t.original) : -1
                      )
                    : n.addUneditedChunk(
                        r,
                        t,
                        a.original,
                        i,
                        a.sourcemapLocations
                      )
                  : n.advance(t.content),
                t.outro.length && n.advance(t.outro);
            }),
            a.outro && n.advance(a.outro);
        }),
        {
          file: e.file ? e.file.split(/[/\\]/).pop() : null,
          sources: this.uniqueSources.map(function(t) {
            return e.file ? c(e.file, t.filename) : t.filename;
          }),
          sourcesContent: this.uniqueSources.map(function(t) {
            return e.includeContent ? t.content : null;
          }),
          names: s,
          mappings: n.raw,
        }
      );
    }),
    (E.prototype.generateMap = function(e) {
      return new h(this.generateDecodedMap(e));
    }),
    (E.prototype.getIndentString = function() {
      var e = {};
      return (
        this.sources.forEach(function(t) {
          var s = t.content.indentStr;
          null !== s && (e[s] || (e[s] = 0), (e[s] += 1));
        }),
        Object.keys(e).sort(function(t, s) {
          return e[t] - e[s];
        })[0] || "\t"
      );
    }),
    (E.prototype.indent = function(e) {
      var t = this;
      if ((arguments.length || (e = this.getIndentString()), "" === e))
        return this;
      var s = !this.intro || "\n" === this.intro.slice(-1);
      return (
        this.sources.forEach(function(n, i) {
          var r = void 0 !== n.separator ? n.separator : t.separator,
            a = s || (i > 0 && /\r?\n$/.test(r));
          n.content.indent(e, {
            exclude: n.indentExclusionRanges,
            indentStart: a,
          }),
            (s = "\n" === n.content.lastChar());
        }),
        this.intro &&
          (this.intro =
            e +
            this.intro.replace(/^[^\n]/gm, function(t, s) {
              return s > 0 ? e + t : t;
            })),
        this
      );
    }),
    (E.prototype.prepend = function(e) {
      return (this.intro = e + this.intro), this;
    }),
    (E.prototype.toString = function() {
      var e = this,
        t = this.sources
          .map(function(t, s) {
            var n = void 0 !== t.separator ? t.separator : e.separator;
            return (s > 0 ? n : "") + t.content.toString();
          })
          .join("");
      return this.intro + t;
    }),
    (E.prototype.isEmpty = function() {
      return (
        (!this.intro.length || !this.intro.trim()) &&
        !this.sources.some(function(e) {
          return !e.content.isEmpty();
        })
      );
    }),
    (E.prototype.length = function() {
      return this.sources.reduce(function(e, t) {
        return e + t.content.length();
      }, this.intro.length);
    }),
    (E.prototype.trimLines = function() {
      return this.trim("[\\r\\n]");
    }),
    (E.prototype.trim = function(e) {
      return this.trimStart(e).trimEnd(e);
    }),
    (E.prototype.trimStart = function(e) {
      var t = new RegExp("^" + (e || "\\s") + "+");
      if (((this.intro = this.intro.replace(t, "")), !this.intro)) {
        var s,
          n = 0;
        do {
          if (!(s = this.sources[n++])) break;
        } while (!s.content.trimStartAborted(e));
      }
      return this;
    }),
    (E.prototype.trimEnd = function(e) {
      var t,
        s = new RegExp((e || "\\s") + "+$"),
        n = this.sources.length - 1;
      do {
        if (!(t = this.sources[n--])) {
          this.intro = this.intro.replace(s, "");
          break;
        }
      } while (!t.content.trimEndAborted(e));
      return this;
    });
  var b = v;
  function v(e, t) {
    if (!e) throw new Error(t || "Assertion failed");
  }
  function S(e, t) {
    return (
      55296 == (64512 & e.charCodeAt(t)) &&
      !(t < 0 || t + 1 >= e.length) && 56320 == (64512 & e.charCodeAt(t + 1))
    );
  }
  function A(e) {
    return (
      ((e >>> 24) |
        ((e >>> 8) & 65280) |
        ((e << 8) & 16711680) |
        ((255 & e) << 24)) >>>
      0
    );
  }
  function C(e) {
    return 1 === e.length ? "0" + e : e;
  }
  function k(e) {
    return 7 === e.length
      ? "0" + e
      : 6 === e.length
      ? "00" + e
      : 5 === e.length
      ? "000" + e
      : 4 === e.length
      ? "0000" + e
      : 3 === e.length
      ? "00000" + e
      : 2 === e.length
      ? "000000" + e
      : 1 === e.length
      ? "0000000" + e
      : e;
  }
  v.equal = function(e, t, s) {
    if (e != t) throw new Error(s || "Assertion failed: " + e + " != " + t);
  };
  var P = {
    inherits: (function(e, t) {
      return e((t = { exports: {} }), t.exports), t.exports;
    })(function(e) {
      "function" == typeof Object.create
        ? (e.exports = function(e, t) {
            (e.super_ = t),
              (e.prototype = Object.create(t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              }));
          })
        : (e.exports = function(e, t) {
            e.super_ = t;
            var s = function() {};
            (s.prototype = t.prototype),
              (e.prototype = new s()),
              (e.prototype.constructor = e);
          });
    }),
    toArray: function(e, t) {
      if (Array.isArray(e)) return e.slice();
      if (!e) return [];
      var s = [];
      if ("string" == typeof e)
        if (t) {
          if ("hex" === t)
            for (
              (e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 &&
                (e = "0" + e),
                i = 0;
              i < e.length;
              i += 2
            )
              s.push(parseInt(e[i] + e[i + 1], 16));
        } else
          for (var n = 0, i = 0; i < e.length; i++) {
            var r = e.charCodeAt(i);
            r < 128
              ? (s[n++] = r)
              : r < 2048
              ? ((s[n++] = (r >> 6) | 192), (s[n++] = (63 & r) | 128))
              : S(e, i)
              ? ((r = 65536 + ((1023 & r) << 10) + (1023 & e.charCodeAt(++i))),
                (s[n++] = (r >> 18) | 240),
                (s[n++] = ((r >> 12) & 63) | 128),
                (s[n++] = ((r >> 6) & 63) | 128),
                (s[n++] = (63 & r) | 128))
              : ((s[n++] = (r >> 12) | 224),
                (s[n++] = ((r >> 6) & 63) | 128),
                (s[n++] = (63 & r) | 128));
          }
      else for (i = 0; i < e.length; i++) s[i] = 0 | e[i];
      return s;
    },
    toHex: function(e) {
      for (var t = "", s = 0; s < e.length; s++) t += C(e[s].toString(16));
      return t;
    },
    htonl: A,
    toHex32: function(e, t) {
      for (var s = "", n = 0; n < e.length; n++) {
        var i = e[n];
        "little" === t && (i = A(i)), (s += k(i.toString(16)));
      }
      return s;
    },
    zero2: C,
    zero8: k,
    join32: function(e, t, s, n) {
      var i = s - t;
      b(i % 4 == 0);
      for (var r = new Array(i / 4), a = 0, o = t; a < r.length; a++, o += 4) {
        var h;
        (h =
          "big" === n
            ? (e[o] << 24) | (e[o + 1] << 16) | (e[o + 2] << 8) | e[o + 3]
            : (e[o + 3] << 24) | (e[o + 2] << 16) | (e[o + 1] << 8) | e[o]),
          (r[a] = h >>> 0);
      }
      return r;
    },
    split32: function(e, t) {
      for (
        var s = new Array(4 * e.length), n = 0, i = 0;
        n < e.length;
        n++, i += 4
      ) {
        var r = e[n];
        "big" === t
          ? ((s[i] = r >>> 24),
            (s[i + 1] = (r >>> 16) & 255),
            (s[i + 2] = (r >>> 8) & 255),
            (s[i + 3] = 255 & r))
          : ((s[i + 3] = r >>> 24),
            (s[i + 2] = (r >>> 16) & 255),
            (s[i + 1] = (r >>> 8) & 255),
            (s[i] = 255 & r));
      }
      return s;
    },
    rotr32: function(e, t) {
      return (e >>> t) | (e << (32 - t));
    },
    rotl32: function(e, t) {
      return (e << t) | (e >>> (32 - t));
    },
    sum32: function(e, t) {
      return (e + t) >>> 0;
    },
    sum32_3: function(e, t, s) {
      return (e + t + s) >>> 0;
    },
    sum32_4: function(e, t, s, n) {
      return (e + t + s + n) >>> 0;
    },
    sum32_5: function(e, t, s, n, i) {
      return (e + t + s + n + i) >>> 0;
    },
    sum64: function(e, t, s, n) {
      var i = e[t],
        r = (n + e[t + 1]) >>> 0,
        a = (r < n ? 1 : 0) + s + i;
      (e[t] = a >>> 0), (e[t + 1] = r);
    },
    sum64_hi: function(e, t, s, n) {
      return (((t + n) >>> 0 < t ? 1 : 0) + e + s) >>> 0;
    },
    sum64_lo: function(e, t, s, n) {
      return (t + n) >>> 0;
    },
    sum64_4_hi: function(e, t, s, n, i, r, a, o) {
      var h = 0,
        l = t;
      return (
        (h += (l = (l + n) >>> 0) < t ? 1 : 0),
        (h += (l = (l + r) >>> 0) < r ? 1 : 0),
        (e + s + i + a + (h += (l = (l + o) >>> 0) < o ? 1 : 0)) >>> 0
      );
    },
    sum64_4_lo: function(e, t, s, n, i, r, a, o) {
      return (t + n + r + o) >>> 0;
    },
    sum64_5_hi: function(e, t, s, n, i, r, a, o, h, l) {
      var c = 0,
        u = t;
      return (
        (c += (u = (u + n) >>> 0) < t ? 1 : 0),
        (c += (u = (u + r) >>> 0) < r ? 1 : 0),
        (c += (u = (u + o) >>> 0) < o ? 1 : 0),
        (e + s + i + a + h + (c += (u = (u + l) >>> 0) < l ? 1 : 0)) >>> 0
      );
    },
    sum64_5_lo: function(e, t, s, n, i, r, a, o, h, l) {
      return (t + n + r + o + l) >>> 0;
    },
    rotr64_hi: function(e, t, s) {
      return ((t << (32 - s)) | (e >>> s)) >>> 0;
    },
    rotr64_lo: function(e, t, s) {
      return ((e << (32 - s)) | (t >>> s)) >>> 0;
    },
    shr64_hi: function(e, t, s) {
      return e >>> s;
    },
    shr64_lo: function(e, t, s) {
      return ((e << (32 - s)) | (t >>> s)) >>> 0;
    },
  };
  function w() {
    (this.pending = null),
      (this.pendingTotal = 0),
      (this.blockSize = this.constructor.blockSize),
      (this.outSize = this.constructor.outSize),
      (this.hmacStrength = this.constructor.hmacStrength),
      (this.padLength = this.constructor.padLength / 8),
      (this.endian = "big"),
      (this._delta8 = this.blockSize / 8),
      (this._delta32 = this.blockSize / 32);
  }
  var I = w;
  (w.prototype.update = function(e, t) {
    if (
      ((e = P.toArray(e, t)),
      this.pending
        ? (this.pending = this.pending.concat(e))
        : (this.pending = e),
      (this.pendingTotal += e.length),
      this.pending.length >= this._delta8)
    ) {
      var s = (e = this.pending).length % this._delta8;
      (this.pending = e.slice(e.length - s, e.length)),
        0 === this.pending.length && (this.pending = null),
        (e = P.join32(e, 0, e.length - s, this.endian));
      for (var n = 0; n < e.length; n += this._delta32)
        this._update(e, n, n + this._delta32);
    }
    return this;
  }),
    (w.prototype.digest = function(e) {
      return (
        this.update(this._pad()), b(null === this.pending), this._digest(e)
      );
    }),
    (w.prototype._pad = function() {
      var e = this.pendingTotal,
        t = this._delta8,
        s = t - ((e + this.padLength) % t),
        n = new Array(s + this.padLength);
      n[0] = 128;
      for (var i = 1; i < s; i++) n[i] = 0;
      if (((e <<= 3), "big" === this.endian)) {
        for (var r = 8; r < this.padLength; r++) n[i++] = 0;
        (n[i++] = 0),
          (n[i++] = 0),
          (n[i++] = 0),
          (n[i++] = 0),
          (n[i++] = (e >>> 24) & 255),
          (n[i++] = (e >>> 16) & 255),
          (n[i++] = (e >>> 8) & 255),
          (n[i++] = 255 & e);
      } else
        for (
          n[i++] = 255 & e,
            n[i++] = (e >>> 8) & 255,
            n[i++] = (e >>> 16) & 255,
            n[i++] = (e >>> 24) & 255,
            n[i++] = 0,
            n[i++] = 0,
            n[i++] = 0,
            n[i++] = 0,
            r = 8;
          r < this.padLength;
          r++
        )
          n[i++] = 0;
      return n;
    });
  var N = { BlockHash: I },
    $ = P.rotr32;
  function _(e, t, s) {
    return (e & t) ^ (~e & s);
  }
  function L(e, t, s) {
    return (e & t) ^ (e & s) ^ (t & s);
  }
  function T(e, t, s) {
    return e ^ t ^ s;
  }
  var R = {
      ft_1: function(e, t, s, n) {
        return 0 === e
          ? _(t, s, n)
          : 1 === e || 3 === e
          ? T(t, s, n)
          : 2 === e
          ? L(t, s, n)
          : void 0;
      },
      ch32: _,
      maj32: L,
      p32: T,
      s0_256: function(e) {
        return $(e, 2) ^ $(e, 13) ^ $(e, 22);
      },
      s1_256: function(e) {
        return $(e, 6) ^ $(e, 11) ^ $(e, 25);
      },
      g0_256: function(e) {
        return $(e, 7) ^ $(e, 18) ^ (e >>> 3);
      },
      g1_256: function(e) {
        return $(e, 17) ^ $(e, 19) ^ (e >>> 10);
      },
    },
    M = P.sum32,
    O = P.sum32_4,
    D = P.sum32_5,
    V = R.ch32,
    B = R.maj32,
    F = R.s0_256,
    W = R.s1_256,
    j = R.g0_256,
    U = R.g1_256,
    z = N.BlockHash,
    G = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298,
    ];
  function H() {
    if (!(this instanceof H)) return new H();
    z.call(this),
      (this.h = [
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225,
      ]),
      (this.k = G),
      (this.W = new Array(64));
  }
  P.inherits(H, z);
  var q = H;
  (H.blockSize = 512),
    (H.outSize = 256),
    (H.hmacStrength = 192),
    (H.padLength = 64),
    (H.prototype._update = function(e, t) {
      for (var s = this.W, n = 0; n < 16; n++) s[n] = e[t + n];
      for (; n < s.length; n++)
        s[n] = O(U(s[n - 2]), s[n - 7], j(s[n - 15]), s[n - 16]);
      var i = this.h[0],
        r = this.h[1],
        a = this.h[2],
        o = this.h[3],
        h = this.h[4],
        l = this.h[5],
        c = this.h[6],
        u = this.h[7];
      for (b(this.k.length === s.length), n = 0; n < s.length; n++) {
        var d = D(u, W(h), V(h, l, c), this.k[n], s[n]),
          p = M(F(i), B(i, r, a));
        (u = c),
          (c = l),
          (l = h),
          (h = M(o, d)),
          (o = a),
          (a = r),
          (r = i),
          (i = M(d, p));
      }
      (this.h[0] = M(this.h[0], i)),
        (this.h[1] = M(this.h[1], r)),
        (this.h[2] = M(this.h[2], a)),
        (this.h[3] = M(this.h[3], o)),
        (this.h[4] = M(this.h[4], h)),
        (this.h[5] = M(this.h[5], l)),
        (this.h[6] = M(this.h[6], c)),
        (this.h[7] = M(this.h[7], u));
    }),
    (H.prototype._digest = function(e) {
      return "hex" === e ? P.toHex32(this.h, "big") : P.split32(this.h, "big");
    });
  const K = () => q();
  function Y(e, t) {
    const s = e.split(/[/\\]/).filter(Boolean),
      n = t.split(/[/\\]/).filter(Boolean);
    for (
      "." === s[0] && s.shift(), "." === n[0] && n.shift();
      s[0] && n[0] && s[0] === n[0];

    )
      s.shift(), n.shift();
    for (; ".." === n[0] && s.length > 0; ) n.shift(), s.pop();
    for (; s.pop(); ) n.unshift("..");
    return n.join("/");
  }
  const X = Symbol("Unknown Key"),
    Q = [],
    J = [X],
    Z = Symbol("Entities");
  class ee {
    constructor() {
      this.entityPaths = Object.create(null, { [Z]: { value: new Set() } });
    }
    getEntities(e) {
      let t = this.entityPaths;
      for (const s of e)
        t = t[s] = t[s] || Object.create(null, { [Z]: { value: new Set() } });
      return t[Z];
    }
  }
  const te = new ee(),
    se = 0,
    ne = 1,
    ie = 2;
  function re() {
    return { brokenFlow: se, includedLabels: new Set() };
  }
  function ae() {
    return {
      accessed: new ee(),
      assigned: new ee(),
      brokenFlow: se,
      called: new ee(),
      ignore: {
        breaks: !1,
        continues: !1,
        labels: new Set(),
        returnAwaitYield: !1,
      },
      includedLabels: new Set(),
      instantiated: new ee(),
      replacedVariableInits: new Map(),
    };
  }
  const oe = "BlockStatement",
    he = "CallExpression",
    le = "ExportNamespaceSpecifier",
    ce = "ExpressionStatement",
    ue = "FunctionExpression",
    de = "Identifier",
    pe = "ImportDefaultSpecifier",
    fe = "ImportNamespaceSpecifier",
    me = "Program",
    ge = "Property",
    xe = "ReturnStatement";
  function ye(e, t, s, n) {
    if ((t.remove(s, n), e.annotations))
      for (const n of e.annotations) {
        if (!(n.start < s)) return;
        t.remove(n.start, n.end);
      }
  }
  function Ee(e, t) {
    if (
      (e.annotations || e.parent.type !== ce || (e = e.parent), e.annotations)
    )
      for (const s of e.annotations) t.remove(s.start, s.end);
  }
  const be = { isNoStatement: !0 };
  function ve(e, t, s = 0) {
    let n, i;
    for (n = e.indexOf(t, s); ; ) {
      if (-1 === (s = e.indexOf("/", s)) || s > n) return n;
      (i = e.charCodeAt(++s)),
        ++s,
        (s = 47 === i ? e.indexOf("\n", s) + 1 : e.indexOf("*/", s) + 2) > n &&
          (n = e.indexOf(t, s));
    }
  }
  function Se(e) {
    let t,
      s,
      n = 0;
    for (t = e.indexOf("\n", n); ; ) {
      if (-1 === (n = e.indexOf("/", n)) || n > t) return t;
      if (47 === (s = e.charCodeAt(++n))) return t;
      (n = e.indexOf("*/", n + 2) + 2) > t && (t = e.indexOf("\n", n));
    }
  }
  function Ae(e, t, s, n, i) {
    let r,
      a,
      o,
      h,
      l = e[0],
      c = !l.included || l.needsBoundaries;
    c && (h = s + Se(t.original.slice(s, l.start)) + 1);
    for (let s = 1; s <= e.length; s++)
      (r = l),
        (a = h),
        (o = c),
        (c = void 0 !== (l = e[s]) && (!l.included || l.needsBoundaries)),
        o || c
          ? ((h =
              r.end +
              Se(t.original.slice(r.end, void 0 === l ? n : l.start)) +
              1),
            r.included
              ? o
                ? r.render(t, i, { end: h, start: a })
                : r.render(t, i)
              : ye(r, t, a, h))
          : r.render(t, i);
  }
  function Ce(e, t, s, n) {
    const i = [];
    let r,
      a,
      o,
      h,
      l,
      c = s - 1;
    for (let n = 0; n < e.length; n++) {
      for (
        a = e[n],
          void 0 !== r &&
            (c = r.end + ve(t.original.slice(r.end, a.start), ",")),
          o = h = c + 2 + Se(t.original.slice(c + 1, a.start));
        32 === (l = t.original.charCodeAt(o)) ||
        9 === l ||
        10 === l ||
        13 === l;

      )
        o++;
      void 0 !== r &&
        i.push({ contentEnd: h, end: o, node: r, separator: c, start: s }),
        (r = a),
        (s = o);
    }
    return (
      i.push({ contentEnd: n, end: n, node: r, separator: null, start: s }), i
    );
  }
  function ke(e, t, s) {
    for (;;) {
      const n = Se(e.original.slice(t, s));
      if (-1 === n) break;
      (t = t + n + 1), e.remove(t - 1, t);
    }
  }
  const Pe = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$",
    we = 64;
  function Ie(e) {
    let t = "";
    do {
      const s = e % we;
      (e = Math.floor(e / we)), (t = Pe[s] + t);
    } while (0 !== e);
    return t;
  }
  const Ne = Object.assign(Object.create(null), {
    await: !0,
    break: !0,
    case: !0,
    catch: !0,
    class: !0,
    const: !0,
    continue: !0,
    debugger: !0,
    default: !0,
    delete: !0,
    do: !0,
    else: !0,
    enum: !0,
    eval: !0,
    export: !0,
    extends: !0,
    false: !0,
    finally: !0,
    for: !0,
    function: !0,
    if: !0,
    implements: !0,
    import: !0,
    in: !0,
    instanceof: !0,
    interface: !0,
    let: !0,
    new: !0,
    null: !0,
    package: !0,
    private: !0,
    protected: !0,
    public: !0,
    return: !0,
    static: !0,
    super: !0,
    switch: !0,
    this: !0,
    throw: !0,
    true: !0,
    try: !0,
    typeof: !0,
    undefined: !0,
    var: !0,
    void: !0,
    while: !0,
    with: !0,
    yield: !0,
  });
  function $e(e, t) {
    let s = e,
      n = 1;
    for (; t.has(s) || Ne[s]; ) s = `${e}$${Ie(n++)}`;
    return t.add(s), s;
  }
  const _e = [];
  function Le(e, t = null) {
    return Object.create(t, e);
  }
  const Te = Symbol("Unknown Value"),
    Re = {
      deoptimizePath: () => {},
      getLiteralValueAtPath: () => Te,
      getReturnExpressionWhenCalledAtPath: () => Re,
      hasEffectsWhenAccessedAtPath: (e) => e.length > 0,
      hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
      hasEffectsWhenCalledAtPath: () => !0,
      include: () => {},
      includeCallArguments(e, t) {
        for (const s of t) s.include(e, !1);
      },
      included: !0,
      toString: () => "[[UNKNOWN]]",
    },
    Me = {
      deoptimizePath: () => {},
      getLiteralValueAtPath: () => void 0,
      getReturnExpressionWhenCalledAtPath: () => Re,
      hasEffectsWhenAccessedAtPath: (e) => e.length > 0,
      hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
      hasEffectsWhenCalledAtPath: () => !0,
      include: () => {},
      includeCallArguments() {},
      included: !0,
      toString: () => "undefined",
    },
    Oe = {
      value: {
        returns: null,
        returnsPrimitive: Re,
        callsArgs: null,
        mutatesSelf: !0,
      },
    },
    De = {
      value: {
        returns: null,
        returnsPrimitive: Re,
        callsArgs: [0],
        mutatesSelf: !1,
      },
    };
  class Ve {
    constructor() {
      this.included = !1;
    }
    deoptimizePath() {}
    getLiteralValueAtPath() {
      return Te;
    }
    getReturnExpressionWhenCalledAtPath(e) {
      return 1 === e.length ? rt(et, e[0]) : Re;
    }
    hasEffectsWhenAccessedAtPath(e) {
      return e.length > 1;
    }
    hasEffectsWhenAssignedAtPath(e) {
      return e.length > 1;
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return 1 !== e.length || it(et, e[0], this.included, t, s);
    }
    include() {
      this.included = !0;
    }
    includeCallArguments(e, t) {
      for (const s of t) s.include(e, !1);
    }
    toString() {
      return "[[UNKNOWN ARRAY]]";
    }
  }
  const Be = {
      value: {
        callsArgs: null,
        mutatesSelf: !1,
        returns: Ve,
        returnsPrimitive: null,
      },
    },
    Fe = {
      value: {
        callsArgs: null,
        mutatesSelf: !0,
        returns: Ve,
        returnsPrimitive: null,
      },
    },
    We = {
      value: {
        callsArgs: [0],
        mutatesSelf: !1,
        returns: Ve,
        returnsPrimitive: null,
      },
    },
    je = {
      value: {
        callsArgs: [0],
        mutatesSelf: !0,
        returns: Ve,
        returnsPrimitive: null,
      },
    },
    Ue = {
      deoptimizePath: () => {},
      getLiteralValueAtPath: () => Te,
      getReturnExpressionWhenCalledAtPath: (e) =>
        1 === e.length ? rt(tt, e[0]) : Re,
      hasEffectsWhenAccessedAtPath: (e) => e.length > 1,
      hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
      hasEffectsWhenCalledAtPath: (e) => {
        if (1 === e.length) {
          const t = e[0];
          return "string" != typeof t || !tt[t];
        }
        return !0;
      },
      include: () => {},
      includeCallArguments(e, t) {
        for (const s of t) s.include(e, !1);
      },
      included: !0,
      toString: () => "[[UNKNOWN BOOLEAN]]",
    },
    ze = {
      value: {
        callsArgs: null,
        mutatesSelf: !1,
        returns: null,
        returnsPrimitive: Ue,
      },
    },
    Ge = {
      value: {
        callsArgs: [0],
        mutatesSelf: !1,
        returns: null,
        returnsPrimitive: Ue,
      },
    },
    He = {
      deoptimizePath: () => {},
      getLiteralValueAtPath: () => Te,
      getReturnExpressionWhenCalledAtPath: (e) =>
        1 === e.length ? rt(st, e[0]) : Re,
      hasEffectsWhenAccessedAtPath: (e) => e.length > 1,
      hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
      hasEffectsWhenCalledAtPath: (e) => {
        if (1 === e.length) {
          const t = e[0];
          return "string" != typeof t || !st[t];
        }
        return !0;
      },
      include: () => {},
      includeCallArguments(e, t) {
        for (const s of t) s.include(e, !1);
      },
      included: !0,
      toString: () => "[[UNKNOWN NUMBER]]",
    },
    qe = {
      value: {
        callsArgs: null,
        mutatesSelf: !1,
        returns: null,
        returnsPrimitive: He,
      },
    },
    Ke = {
      value: {
        callsArgs: null,
        mutatesSelf: !0,
        returns: null,
        returnsPrimitive: He,
      },
    },
    Ye = {
      value: {
        callsArgs: [0],
        mutatesSelf: !1,
        returns: null,
        returnsPrimitive: He,
      },
    },
    Xe = {
      deoptimizePath: () => {},
      getLiteralValueAtPath: () => Te,
      getReturnExpressionWhenCalledAtPath: (e) =>
        1 === e.length ? rt(nt, e[0]) : Re,
      hasEffectsWhenAccessedAtPath: (e) => e.length > 1,
      hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
      hasEffectsWhenCalledAtPath: (e, t, s) =>
        1 !== e.length || it(nt, e[0], !0, t, s),
      include: () => {},
      includeCallArguments(e, t) {
        for (const s of t) s.include(e, !1);
      },
      included: !0,
      toString: () => "[[UNKNOWN STRING]]",
    },
    Qe = {
      value: {
        callsArgs: null,
        mutatesSelf: !1,
        returns: null,
        returnsPrimitive: Xe,
      },
    };
  class Je {
    constructor() {
      this.included = !1;
    }
    deoptimizePath() {}
    getLiteralValueAtPath() {
      return Te;
    }
    getReturnExpressionWhenCalledAtPath(e) {
      return 1 === e.length ? rt(Ze, e[0]) : Re;
    }
    hasEffectsWhenAccessedAtPath(e) {
      return e.length > 1;
    }
    hasEffectsWhenAssignedAtPath(e) {
      return e.length > 1;
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return 1 !== e.length || it(Ze, e[0], this.included, t, s);
    }
    include() {
      this.included = !0;
    }
    includeCallArguments(e, t) {
      for (const s of t) s.include(e, !1);
    }
    toString() {
      return "[[UNKNOWN OBJECT]]";
    }
  }
  const Ze = Le({
      hasOwnProperty: ze,
      isPrototypeOf: ze,
      propertyIsEnumerable: ze,
      toLocaleString: Qe,
      toString: Qe,
      valueOf: {
        value: {
          callsArgs: null,
          mutatesSelf: !1,
          returns: null,
          returnsPrimitive: Re,
        },
      },
    }),
    et = Le(
      {
        concat: Be,
        copyWithin: Fe,
        every: Ge,
        fill: Fe,
        filter: We,
        find: De,
        findIndex: Ye,
        forEach: De,
        includes: ze,
        indexOf: qe,
        join: Qe,
        lastIndexOf: qe,
        map: We,
        pop: Oe,
        push: Ke,
        reduce: De,
        reduceRight: De,
        reverse: Fe,
        shift: Oe,
        slice: Be,
        some: Ge,
        sort: je,
        splice: Fe,
        unshift: Ke,
      },
      Ze
    ),
    tt = Le({ valueOf: ze }, Ze),
    st = Le(
      {
        toExponential: Qe,
        toFixed: Qe,
        toLocaleString: Qe,
        toPrecision: Qe,
        valueOf: qe,
      },
      Ze
    ),
    nt = Le(
      {
        charAt: Qe,
        charCodeAt: qe,
        codePointAt: qe,
        concat: Qe,
        endsWith: ze,
        includes: ze,
        indexOf: qe,
        lastIndexOf: qe,
        localeCompare: qe,
        match: ze,
        normalize: Qe,
        padEnd: Qe,
        padStart: Qe,
        repeat: Qe,
        replace: {
          value: {
            callsArgs: [1],
            mutatesSelf: !1,
            returns: null,
            returnsPrimitive: Xe,
          },
        },
        search: qe,
        slice: Qe,
        split: Be,
        startsWith: ze,
        substr: Qe,
        substring: Qe,
        toLocaleLowerCase: Qe,
        toLocaleUpperCase: Qe,
        toLowerCase: Qe,
        toUpperCase: Qe,
        trim: Qe,
        valueOf: Qe,
      },
      Ze
    );
  function it(e, t, s, n, i) {
    if ("string" != typeof t || !e[t] || (e[t].mutatesSelf && s)) return !0;
    if (!e[t].callsArgs) return !1;
    for (const s of e[t].callsArgs)
      if (
        n.args[s] &&
        n.args[s].hasEffectsWhenCalledAtPath(Q, { args: _e, withNew: !1 }, i)
      )
        return !0;
    return !1;
  }
  function rt(e, t) {
    return "string" == typeof t && e[t]
      ? null !== e[t].returnsPrimitive
        ? e[t].returnsPrimitive
        : new e[t].returns()
      : Re;
  }
  class at {
    constructor(e) {
      (this.alwaysRendered = !1),
        (this.exportName = null),
        (this.included = !1),
        (this.isId = !1),
        (this.isReassigned = !1),
        (this.renderBaseName = null),
        (this.renderName = null),
        (this.safeExportName = null),
        (this.name = e);
    }
    addReference(e) {}
    deoptimizePath(e) {}
    getBaseVariableName() {
      return this.renderBaseName || this.renderName || this.name;
    }
    getLiteralValueAtPath(e, t, s) {
      return Te;
    }
    getName() {
      const e = this.renderName || this.name;
      return this.renderBaseName ? `${this.renderBaseName}.${e}` : e;
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      return Re;
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      return e.length > 0;
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return !0;
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return !0;
    }
    include(e) {
      this.included = !0;
    }
    includeCallArguments(e, t) {
      for (const s of t) s.include(e, !1);
    }
    markCalledFromTryStatement() {}
    setRenderNames(e, t) {
      (this.renderBaseName = e), (this.renderName = t);
    }
    setSafeName(e) {
      this.renderName = e;
    }
    toString() {
      return this.name;
    }
  }
  class ot extends at {
    constructor(e, t) {
      super(t),
        (this.module = e),
        (this.isNamespace = "*" === t),
        (this.referenced = !1);
    }
    addReference(e) {
      (this.referenced = !0),
        ("default" !== this.name && "*" !== this.name) ||
          this.module.suggestName(e.name);
    }
    include() {
      this.included || ((this.included = !0), (this.module.used = !0));
    }
  }
  const ht = "break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public".split(
      " "
    ),
    lt = "Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl".split(
      " "
    ),
    ct = new Set(ht.concat(lt)),
    ut = /[^$_a-zA-Z0-9]/g,
    dt = (e) => /\d/.test(e[0]);
  function pt(e) {
    return (
      (e = e.replace(/-(\w)/g, (e, t) => t.toUpperCase()).replace(ut, "_")),
      (dt(e) || ct.has(e)) && (e = `_${e}`),
      e || "_"
    );
  }
  const ft = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/,
    mt = /^\.?\.\//;
  function gt(e) {
    return ft.test(e);
  }
  function xt(e) {
    return mt.test(e);
  }
  function yt(e) {
    return e.replace(/\\/g, "/");
  }
  function Et(e) {
    return e.split(/(\/|\\)/).pop();
  }
  function bt(e) {
    const t = /(\/|\\)[^/\\]*$/.exec(e);
    if (!t) return ".";
    const s = e.slice(0, -t[0].length);
    return s || "/";
  }
  function vt(e) {
    const t = /\.[^.]+$/.exec(Et(e));
    return t ? t[0] : "";
  }
  function St(e, t) {
    const s = e.split(/[/\\]/).filter(Boolean),
      n = t.split(/[/\\]/).filter(Boolean);
    for (
      "." === s[0] && s.shift(), "." === n[0] && n.shift();
      s[0] && n[0] && s[0] === n[0];

    )
      s.shift(), n.shift();
    for (; ".." === n[0] && s.length > 0; ) n.shift(), s.pop();
    for (; s.pop(); ) n.unshift("..");
    return n.join("/");
  }
  function At(...e) {
    let t = e.shift().split(/[/\\]/);
    return (
      e.forEach((e) => {
        if (gt(e)) t = e.split(/[/\\]/);
        else {
          const s = e.split(/[/\\]/);
          for (; "." === s[0] || ".." === s[0]; ) {
            ".." === s.shift() && t.pop();
          }
          t.push.apply(t, s);
        }
      }),
      t.join("/")
    );
  }
  class Ct {
    constructor(e, t, s) {
      (this.exportsNames = !1),
        (this.exportsNamespace = !1),
        (this.mostCommonSuggestion = 0),
        (this.reexported = !1),
        (this.renderPath = void 0),
        (this.renormalizeRenderPath = !1),
        (this.used = !1),
        (this.graph = e),
        (this.id = t),
        (this.execIndex = 1 / 0),
        (this.moduleSideEffects = s);
      const n = t.split(/[\\/]/);
      (this.variableName = pt(n.pop())),
        (this.nameSuggestions = Object.create(null)),
        (this.declarations = Object.create(null)),
        (this.exportedVariables = new Map());
    }
    getVariableForExportName(e) {
      "*" === e
        ? (this.exportsNamespace = !0)
        : "default" !== e && (this.exportsNames = !0);
      let t = this.declarations[e];
      return (
        t ||
        ((this.declarations[e] = t = new ot(this, e)),
        this.exportedVariables.set(t, e),
        t)
      );
    }
    setRenderPath(e, t) {
      return (
        (this.renderPath = ""),
        e.paths &&
          (this.renderPath =
            "function" == typeof e.paths ? e.paths(this.id) : e.paths[this.id]),
        this.renderPath ||
          (gt(this.id)
            ? ((this.renderPath = yt(St(t, this.id))),
              (this.renormalizeRenderPath = !0))
            : (this.renderPath = this.id)),
        this.renderPath
      );
    }
    suggestName(e) {
      this.nameSuggestions[e] || (this.nameSuggestions[e] = 0),
        (this.nameSuggestions[e] += 1),
        this.nameSuggestions[e] > this.mostCommonSuggestion &&
          ((this.mostCommonSuggestion = this.nameSuggestions[e]),
          (this.variableName = e));
    }
    warnUnusedImports() {
      const e = Object.keys(this.declarations).filter((e) => {
        if ("*" === e) return !1;
        const t = this.declarations[e];
        return !t.included && !this.reexported && !t.referenced;
      });
      if (0 === e.length) return;
      const t =
        1 === e.length
          ? `'${e[0]}' is`
          : `${e
              .slice(0, -1)
              .map((e) => `'${e}'`)
              .join(", ")} and '${e.slice(-1)}' are`;
      this.graph.warn({
        code: "UNUSED_EXTERNAL_IMPORT",
        message: `${t} imported from external module '${this.id}' but never used`,
        names: e,
        source: this.id,
      });
    }
  }
  function kt(e) {
    e.isExecuted = !0;
    const t = [e],
      s = new Set();
    for (const e of t)
      for (const n of e.dependencies)
        n instanceof Ct ||
          n.isExecuted ||
          !n.moduleSideEffects ||
          s.has(n.id) ||
          ((n.isExecuted = !0), s.add(n.id), t.push(n));
  }
  const Pt = 7;
  class wt extends at {
    constructor(e, t, s, n) {
      super(e),
        (this.additionalInitializers = null),
        (this.calledFromTryStatement = !1),
        (this.expressionsToBeDeoptimized = []),
        (this.declarations = t ? [t] : []),
        (this.init = s),
        (this.deoptimizationTracker = n.deoptimizationTracker),
        (this.module = n.module);
    }
    addDeclaration(e, t) {
      this.declarations.push(e),
        null === this.additionalInitializers &&
          ((this.additionalInitializers =
            null === this.init ? [] : [this.init]),
          (this.init = Re),
          (this.isReassigned = !0)),
        null !== t && this.additionalInitializers.push(t);
    }
    consolidateInitializers() {
      if (null !== this.additionalInitializers) {
        for (const e of this.additionalInitializers) e.deoptimizePath(J);
        this.additionalInitializers = null;
      }
    }
    deoptimizePath(e) {
      if (e.length > Pt || this.isReassigned) return;
      const t = this.deoptimizationTracker.getEntities(e);
      if (!t.has(this))
        if ((t.add(this), 0 === e.length)) {
          if (!this.isReassigned) {
            this.isReassigned = !0;
            for (const e of this.expressionsToBeDeoptimized)
              e.deoptimizeCache();
            this.init && this.init.deoptimizePath(J);
          }
        } else this.init && this.init.deoptimizePath(e);
    }
    getLiteralValueAtPath(e, t, s) {
      if (this.isReassigned || !this.init || e.length > Pt) return Te;
      const n = t.getEntities(e);
      if (n.has(this.init)) return Te;
      this.expressionsToBeDeoptimized.push(s), n.add(this.init);
      const i = this.init.getLiteralValueAtPath(e, t, s);
      return n.delete(this.init), i;
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      if (this.isReassigned || !this.init || e.length > Pt) return Re;
      const n = t.getEntities(e);
      if (n.has(this.init)) return Re;
      this.expressionsToBeDeoptimized.push(s), n.add(this.init);
      const i = this.init.getReturnExpressionWhenCalledAtPath(e, t, s);
      return n.delete(this.init), i;
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      if (0 === e.length) return !1;
      if (this.isReassigned || e.length > Pt) return !0;
      const s = t.accessed.getEntities(e);
      return (
        !s.has(this) &&
        (s.add(this), this.init && this.init.hasEffectsWhenAccessedAtPath(e, t))
      );
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      if (this.included || e.length > Pt) return !0;
      if (0 === e.length) return !1;
      if (this.isReassigned) return !0;
      const s = t.assigned.getEntities(e);
      return (
        !s.has(this) &&
        (s.add(this), this.init && this.init.hasEffectsWhenAssignedAtPath(e, t))
      );
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      if (e.length > Pt || this.isReassigned) return !0;
      const n = (t.withNew ? s.instantiated : s.called).getEntities(e);
      return (
        !n.has(this) &&
        (n.add(this),
        this.init && this.init.hasEffectsWhenCalledAtPath(e, t, s))
      );
    }
    include(e) {
      if (!this.included) {
        (this.included = !0), this.module.isExecuted || kt(this.module);
        for (const t of this.declarations) {
          t.included || t.include(e, !1);
          let s = t.parent;
          for (; !s.included && ((s.included = !0), s.type !== me); )
            s = s.parent;
        }
      }
    }
    includeCallArguments(e, t) {
      if (this.isReassigned) for (const s of t) s.include(e, !1);
      else this.init && this.init.includeCallArguments(e, t);
    }
    markCalledFromTryStatement() {
      this.calledFromTryStatement = !0;
    }
  }
  class It {
    constructor() {
      (this.children = []), (this.variables = new Map());
    }
    addDeclaration(e, t, s = null, n) {
      const i = e.name;
      let r = this.variables.get(i);
      return (
        r
          ? r.addDeclaration(e, s)
          : ((r = new wt(e.name, e, s || Me, t)), this.variables.set(i, r)),
        r
      );
    }
    contains(e) {
      return this.variables.has(e);
    }
    findVariable(e) {
      throw new Error(
        "Internal Error: findVariable needs to be implemented by a subclass"
      );
    }
  }
  class Nt extends It {
    constructor(e) {
      super(),
        (this.accessedOutsideVariables = new Map()),
        (this.parent = e),
        e.children.push(this);
    }
    addAccessedGlobalsByFormat(e) {
      let t = this.accessedGlobalVariablesByFormat;
      t || (t = this.accessedGlobalVariablesByFormat = new Map());
      for (const s of Object.keys(e)) {
        let n = t.get(s);
        n || ((n = new Set()), t.set(s, n));
        for (const t of e[s]) n.add(t);
      }
      this.parent instanceof Nt && this.parent.addAccessedGlobalsByFormat(e);
    }
    addNamespaceMemberAccess(e, t) {
      this.accessedOutsideVariables.set(e, t),
        this.parent instanceof Nt && this.parent.addNamespaceMemberAccess(e, t);
    }
    addReturnExpression(e) {
      this.parent instanceof Nt && this.parent.addReturnExpression(e);
    }
    contains(e) {
      return this.variables.has(e) || this.parent.contains(e);
    }
    deconflict(e) {
      const t = new Set();
      for (const s of this.accessedOutsideVariables.values())
        s.included &&
          (t.add(s.getBaseVariableName()),
          s.exportName && "system" === e && t.add("exports"));
      const s =
        this.accessedGlobalVariablesByFormat &&
        this.accessedGlobalVariablesByFormat.get(e);
      if (s) for (const e of s) t.add(e);
      for (const [e, s] of this.variables)
        (s.included || s.alwaysRendered) && s.setSafeName($e(e, t));
      for (const t of this.children) t.deconflict(e);
    }
    findLexicalBoundary() {
      return this.parent instanceof Nt
        ? this.parent.findLexicalBoundary()
        : this;
    }
    findVariable(e) {
      const t = this.variables.get(e) || this.accessedOutsideVariables.get(e);
      if (t) return t;
      const s = this.parent.findVariable(e);
      return this.accessedOutsideVariables.set(e, s), s;
    }
  }
  function $t(e, t, s) {
    if ("number" == typeof s)
      throw new Error(
        "locate takes a { startIndex, offsetLine, offsetColumn } object as the third argument"
      );
    return (function(e, t) {
      void 0 === t && (t = {});
      var s = t.offsetLine || 0,
        n = t.offsetColumn || 0,
        i = e.split("\n"),
        r = 0,
        a = i.map(function(e, t) {
          var s = r + e.length + 1,
            n = { start: r, end: s, line: t };
          return (r = s), n;
        }),
        o = 0;
      function h(e, t) {
        return e.start <= t && t < e.end;
      }
      function l(e, t) {
        return { line: s + e.line, column: n + t - e.start, character: t };
      }
      return function(t, s) {
        "string" == typeof t && (t = e.indexOf(t, s || 0));
        for (var n = a[o], i = t >= n.end ? 1 : -1; n; ) {
          if (h(n, t)) return l(n, t);
          n = a[(o += i)];
        }
      };
    })(e, s)(t, s && s.startIndex);
  }
  const _t = { Literal: [], Program: ["body"] };
  const Lt = "variables";
  class Tt {
    constructor(e, t, s) {
      (this.included = !1),
        (this.keys =
          _t[e.type] ||
          (function(e) {
            return (
              (_t[e.type] = Object.keys(e).filter(
                (t) => "object" == typeof e[t]
              )),
              _t[e.type]
            );
          })(e)),
        (this.parent = t),
        (this.context = t.context),
        this.createScope(s),
        this.parseNode(e),
        this.initialise(),
        this.context.magicString.addSourcemapLocation(this.start),
        this.context.magicString.addSourcemapLocation(this.end);
    }
    bind() {
      for (const e of this.keys) {
        const t = this[e];
        if (null !== t && "annotations" !== e)
          if (Array.isArray(t)) for (const e of t) null !== e && e.bind();
          else t.bind();
      }
    }
    createScope(e) {
      this.scope = e;
    }
    declare(e, t) {
      return [];
    }
    deoptimizePath(e) {}
    getLiteralValueAtPath(e, t, s) {
      return Te;
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      return Re;
    }
    hasEffects(e) {
      for (const t of this.keys) {
        const s = this[t];
        if (null !== s && "annotations" !== t)
          if (Array.isArray(s)) {
            for (const t of s) if (null !== t && t.hasEffects(e)) return !0;
          } else if (s.hasEffects(e)) return !0;
      }
      return !1;
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      return e.length > 0;
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return !0;
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return !0;
    }
    include(e, t) {
      this.included = !0;
      for (const s of this.keys) {
        const n = this[s];
        if (null !== n && "annotations" !== s)
          if (Array.isArray(n))
            for (const s of n) null !== s && s.include(e, t);
          else n.include(e, t);
      }
    }
    includeCallArguments(e, t) {
      for (const s of t) s.include(e, !1);
    }
    includeWithAllDeclaredVariables(e, t) {
      this.include(t, e);
    }
    initialise() {}
    insertSemicolon(e) {
      ";" !== e.original[this.end - 1] && e.appendLeft(this.end, ";");
    }
    locate() {
      const e = $t(this.context.code, this.start, { offsetLine: 1 });
      return (
        (e.file = this.context.fileName),
        (e.toString = () => JSON.stringify(e)),
        e
      );
    }
    parseNode(e) {
      for (const t of Object.keys(e)) {
        if (this.hasOwnProperty(t)) continue;
        const s = e[t];
        if ("object" != typeof s || null === s || "annotations" === t)
          this[t] = s;
        else if (Array.isArray(s)) {
          this[t] = [];
          for (const e of s)
            this[t].push(
              null === e
                ? null
                : new (this.context.nodeConstructors[e.type] ||
                    this.context.nodeConstructors.UnknownNode)(
                    e,
                    this,
                    this.scope
                  )
            );
        } else
          this[t] = new (this.context.nodeConstructors[s.type] ||
            this.context.nodeConstructors.UnknownNode)(s, this, this.scope);
      }
    }
    render(e, t) {
      for (const s of this.keys) {
        const n = this[s];
        if (null !== n && "annotations" !== s)
          if (Array.isArray(n)) for (const s of n) null !== s && s.render(e, t);
          else n.render(e, t);
      }
    }
    shouldBeIncluded(e) {
      return this.included || (!e.brokenFlow && this.hasEffects(ae()));
    }
    toString() {
      return this.context.code.slice(this.start, this.end);
    }
  }
  class Rt extends Tt {
    createScope(e) {
      this.scope = new Nt(e);
    }
    hasEffectsWhenAccessedAtPath(e) {
      return e.length > 1;
    }
    hasEffectsWhenAssignedAtPath(e) {
      return e.length > 1;
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return (
        !t.withNew ||
        this.body.hasEffectsWhenCalledAtPath(e, t, s) ||
          (null !== this.superClass &&
            this.superClass.hasEffectsWhenCalledAtPath(e, t, s))
      );
    }
    initialise() {
      null !== this.id && this.id.declare("class", this);
    }
  }
  class Mt extends Rt {
    initialise() {
      super.initialise(), null !== this.id && (this.id.variable.isId = !0);
    }
    parseNode(e) {
      null !== e.id &&
        (this.id = new this.context.nodeConstructors.Identifier(
          e.id,
          this,
          this.scope.parent
        )),
        super.parseNode(e);
    }
    render(e, t) {
      "system" === t.format &&
        this.id &&
        this.id.variable.exportName &&
        e.appendLeft(
          this.end,
          ` exports('${
            this.id.variable.exportName
          }', ${this.id.variable.getName()});`
        ),
        super.render(e, t);
    }
  }
  class Ot extends wt {
    constructor(e) {
      super("arguments", null, Re, e);
    }
    hasEffectsWhenAccessedAtPath(e) {
      return e.length > 1;
    }
    hasEffectsWhenAssignedAtPath() {
      return !0;
    }
    hasEffectsWhenCalledAtPath() {
      return !0;
    }
  }
  class Dt extends wt {
    constructor(e) {
      super("this", null, null, e);
    }
    getLiteralValueAtPath() {
      return Te;
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      return (
        this.getInit(t).hasEffectsWhenAccessedAtPath(e, t) ||
        super.hasEffectsWhenAccessedAtPath(e, t)
      );
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return (
        this.getInit(t).hasEffectsWhenAssignedAtPath(e, t) ||
        super.hasEffectsWhenAssignedAtPath(e, t)
      );
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return (
        this.getInit(s).hasEffectsWhenCalledAtPath(e, t, s) ||
        super.hasEffectsWhenCalledAtPath(e, t, s)
      );
    }
    getInit(e) {
      return e.replacedVariableInits.get(this) || Re;
    }
  }
  class Vt extends Nt {
    constructor(e, t) {
      super(e),
        (this.parameters = []),
        (this.hasRest = !1),
        (this.context = t),
        (this.hoistedBodyVarScope = new Nt(this));
    }
    addParameterDeclaration(e) {
      const t = e.name;
      let s = this.hoistedBodyVarScope.variables.get(t);
      return (
        s ? s.addDeclaration(e, null) : (s = new wt(t, e, Re, this.context)),
        this.variables.set(t, s),
        s
      );
    }
    addParameterVariables(e, t) {
      this.parameters = e;
      for (const t of e) for (const e of t) e.alwaysRendered = !0;
      this.hasRest = t;
    }
    includeCallArguments(e, t) {
      let s = !1,
        n = !1;
      const i = this.hasRest && this.parameters[this.parameters.length - 1];
      for (let r = t.length - 1; r >= 0; r--) {
        const a = this.parameters[r] || i,
          o = t[r];
        if (a) {
          s = !1;
          for (const e of a)
            e.included && (n = !0), e.calledFromTryStatement && (s = !0);
        }
        !n && o.shouldBeIncluded(e) && (n = !0), n && o.include(e, s);
      }
    }
  }
  class Bt extends Vt {
    constructor() {
      super(...arguments),
        (this.returnExpression = null),
        (this.returnExpressions = []);
    }
    addReturnExpression(e) {
      this.returnExpressions.push(e);
    }
    getReturnExpression() {
      return (
        null === this.returnExpression && this.updateReturnExpression(),
        this.returnExpression
      );
    }
    updateReturnExpression() {
      if (1 === this.returnExpressions.length)
        this.returnExpression = this.returnExpressions[0];
      else {
        this.returnExpression = Re;
        for (const e of this.returnExpressions) e.deoptimizePath(J);
      }
    }
  }
  class Ft extends Bt {
    constructor(e, t) {
      super(e, t),
        this.variables.set("arguments", (this.argumentsVariable = new Ot(t))),
        this.variables.set("this", (this.thisVariable = new Dt(t)));
    }
    findLexicalBoundary() {
      return this;
    }
    includeCallArguments(e, t) {
      if ((super.includeCallArguments(e, t), this.argumentsVariable.included))
        for (const s of t) s.included || s.include(e, !1);
    }
  }
  const Wt = Object.create(null),
    jt = Symbol("Value Properties"),
    Ut = { pure: !0 },
    zt = { pure: !1 },
    Gt = { __proto__: null, [jt]: zt },
    Ht = { __proto__: null, [jt]: Ut },
    qt = { __proto__: null, [jt]: zt, prototype: Gt },
    Kt = { __proto__: null, [jt]: Ut, prototype: Gt },
    Yt = { __proto__: null, [jt]: Ut, from: Ht, of: Ht, prototype: Gt },
    Xt = { __proto__: null, [jt]: Ut, supportedLocalesOf: Kt },
    Qt = {
      global: Gt,
      globalThis: Gt,
      self: Gt,
      window: Gt,
      __proto__: null,
      [jt]: zt,
      Array: {
        __proto__: null,
        [jt]: zt,
        from: Ht,
        isArray: Ht,
        of: Ht,
        prototype: Gt,
      },
      ArrayBuffer: { __proto__: null, [jt]: Ut, isView: Ht, prototype: Gt },
      Atomics: Gt,
      BigInt: qt,
      BigInt64Array: qt,
      BigUint64Array: qt,
      Boolean: Kt,
      constructor: qt,
      DataView: Kt,
      Date: {
        __proto__: null,
        [jt]: Ut,
        now: Ht,
        parse: Ht,
        prototype: Gt,
        UTC: Ht,
      },
      decodeURI: Ht,
      decodeURIComponent: Ht,
      encodeURI: Ht,
      encodeURIComponent: Ht,
      Error: Kt,
      escape: Ht,
      eval: Gt,
      EvalError: Kt,
      Float32Array: Yt,
      Float64Array: Yt,
      Function: qt,
      hasOwnProperty: Gt,
      Infinity: Gt,
      Int16Array: Yt,
      Int32Array: Yt,
      Int8Array: Yt,
      isFinite: Ht,
      isNaN: Ht,
      isPrototypeOf: Gt,
      JSON: Gt,
      Map: Kt,
      Math: {
        __proto__: null,
        [jt]: zt,
        abs: Ht,
        acos: Ht,
        acosh: Ht,
        asin: Ht,
        asinh: Ht,
        atan: Ht,
        atan2: Ht,
        atanh: Ht,
        cbrt: Ht,
        ceil: Ht,
        clz32: Ht,
        cos: Ht,
        cosh: Ht,
        exp: Ht,
        expm1: Ht,
        floor: Ht,
        fround: Ht,
        hypot: Ht,
        imul: Ht,
        log: Ht,
        log10: Ht,
        log1p: Ht,
        log2: Ht,
        max: Ht,
        min: Ht,
        pow: Ht,
        random: Ht,
        round: Ht,
        sign: Ht,
        sin: Ht,
        sinh: Ht,
        sqrt: Ht,
        tan: Ht,
        tanh: Ht,
        trunc: Ht,
      },
      NaN: Gt,
      Number: {
        __proto__: null,
        [jt]: Ut,
        isFinite: Ht,
        isInteger: Ht,
        isNaN: Ht,
        isSafeInteger: Ht,
        parseFloat: Ht,
        parseInt: Ht,
        prototype: Gt,
      },
      Object: {
        __proto__: null,
        [jt]: Ut,
        create: Ht,
        getNotifier: Ht,
        getOwn: Ht,
        getOwnPropertyDescriptor: Ht,
        getOwnPropertyNames: Ht,
        getOwnPropertySymbols: Ht,
        getPrototypeOf: Ht,
        is: Ht,
        isExtensible: Ht,
        isFrozen: Ht,
        isSealed: Ht,
        keys: Ht,
        prototype: Gt,
      },
      parseFloat: Ht,
      parseInt: Ht,
      Promise: {
        __proto__: null,
        [jt]: zt,
        all: Ht,
        prototype: Gt,
        race: Ht,
        resolve: Ht,
      },
      propertyIsEnumerable: Gt,
      Proxy: Gt,
      RangeError: Kt,
      ReferenceError: Kt,
      Reflect: Gt,
      RegExp: Kt,
      Set: Kt,
      SharedArrayBuffer: qt,
      String: {
        __proto__: null,
        [jt]: Ut,
        fromCharCode: Ht,
        fromCodePoint: Ht,
        prototype: Gt,
        raw: Ht,
      },
      Symbol: { __proto__: null, [jt]: Ut, for: Ht, keyFor: Ht, prototype: Gt },
      SyntaxError: Kt,
      toLocaleString: Gt,
      toString: Gt,
      TypeError: Kt,
      Uint16Array: Yt,
      Uint32Array: Yt,
      Uint8Array: Yt,
      Uint8ClampedArray: Yt,
      unescape: Ht,
      URIError: Kt,
      valueOf: Gt,
      WeakMap: Kt,
      WeakSet: Kt,
      clearInterval: qt,
      clearTimeout: qt,
      console: Gt,
      Intl: {
        __proto__: null,
        [jt]: zt,
        Collator: Xt,
        DateTimeFormat: Xt,
        ListFormat: Xt,
        NumberFormat: Xt,
        PluralRules: Xt,
        RelativeTimeFormat: Xt,
      },
      setInterval: qt,
      setTimeout: qt,
      TextDecoder: qt,
      TextEncoder: qt,
      URL: qt,
      URLSearchParams: qt,
      AbortController: qt,
      AbortSignal: qt,
      addEventListener: Gt,
      alert: Gt,
      AnalyserNode: qt,
      Animation: qt,
      AnimationEvent: qt,
      applicationCache: Gt,
      ApplicationCache: qt,
      ApplicationCacheErrorEvent: qt,
      atob: Gt,
      Attr: qt,
      Audio: qt,
      AudioBuffer: qt,
      AudioBufferSourceNode: qt,
      AudioContext: qt,
      AudioDestinationNode: qt,
      AudioListener: qt,
      AudioNode: qt,
      AudioParam: qt,
      AudioProcessingEvent: qt,
      AudioScheduledSourceNode: qt,
      AudioWorkletNode: qt,
      BarProp: qt,
      BaseAudioContext: qt,
      BatteryManager: qt,
      BeforeUnloadEvent: qt,
      BiquadFilterNode: qt,
      Blob: qt,
      BlobEvent: qt,
      blur: Gt,
      BroadcastChannel: qt,
      btoa: Gt,
      ByteLengthQueuingStrategy: qt,
      Cache: qt,
      caches: Gt,
      CacheStorage: qt,
      cancelAnimationFrame: Gt,
      cancelIdleCallback: Gt,
      CanvasCaptureMediaStreamTrack: qt,
      CanvasGradient: qt,
      CanvasPattern: qt,
      CanvasRenderingContext2D: qt,
      ChannelMergerNode: qt,
      ChannelSplitterNode: qt,
      CharacterData: qt,
      clientInformation: Gt,
      ClipboardEvent: qt,
      close: Gt,
      closed: Gt,
      CloseEvent: qt,
      Comment: qt,
      CompositionEvent: qt,
      confirm: Gt,
      ConstantSourceNode: qt,
      ConvolverNode: qt,
      CountQueuingStrategy: qt,
      createImageBitmap: Gt,
      Credential: qt,
      CredentialsContainer: qt,
      crypto: Gt,
      Crypto: qt,
      CryptoKey: qt,
      CSS: qt,
      CSSConditionRule: qt,
      CSSFontFaceRule: qt,
      CSSGroupingRule: qt,
      CSSImportRule: qt,
      CSSKeyframeRule: qt,
      CSSKeyframesRule: qt,
      CSSMediaRule: qt,
      CSSNamespaceRule: qt,
      CSSPageRule: qt,
      CSSRule: qt,
      CSSRuleList: qt,
      CSSStyleDeclaration: qt,
      CSSStyleRule: qt,
      CSSStyleSheet: qt,
      CSSSupportsRule: qt,
      CustomElementRegistry: qt,
      customElements: Gt,
      CustomEvent: qt,
      DataTransfer: qt,
      DataTransferItem: qt,
      DataTransferItemList: qt,
      defaultstatus: Gt,
      defaultStatus: Gt,
      DelayNode: qt,
      DeviceMotionEvent: qt,
      DeviceOrientationEvent: qt,
      devicePixelRatio: Gt,
      dispatchEvent: Gt,
      document: Gt,
      Document: qt,
      DocumentFragment: qt,
      DocumentType: qt,
      DOMError: qt,
      DOMException: qt,
      DOMImplementation: qt,
      DOMMatrix: qt,
      DOMMatrixReadOnly: qt,
      DOMParser: qt,
      DOMPoint: qt,
      DOMPointReadOnly: qt,
      DOMQuad: qt,
      DOMRect: qt,
      DOMRectReadOnly: qt,
      DOMStringList: qt,
      DOMStringMap: qt,
      DOMTokenList: qt,
      DragEvent: qt,
      DynamicsCompressorNode: qt,
      Element: qt,
      ErrorEvent: qt,
      Event: qt,
      EventSource: qt,
      EventTarget: qt,
      external: Gt,
      fetch: Gt,
      File: qt,
      FileList: qt,
      FileReader: qt,
      find: Gt,
      focus: Gt,
      FocusEvent: qt,
      FontFace: qt,
      FontFaceSetLoadEvent: qt,
      FormData: qt,
      frames: Gt,
      GainNode: qt,
      Gamepad: qt,
      GamepadButton: qt,
      GamepadEvent: qt,
      getComputedStyle: Gt,
      getSelection: Gt,
      HashChangeEvent: qt,
      Headers: qt,
      history: Gt,
      History: qt,
      HTMLAllCollection: qt,
      HTMLAnchorElement: qt,
      HTMLAreaElement: qt,
      HTMLAudioElement: qt,
      HTMLBaseElement: qt,
      HTMLBodyElement: qt,
      HTMLBRElement: qt,
      HTMLButtonElement: qt,
      HTMLCanvasElement: qt,
      HTMLCollection: qt,
      HTMLContentElement: qt,
      HTMLDataElement: qt,
      HTMLDataListElement: qt,
      HTMLDetailsElement: qt,
      HTMLDialogElement: qt,
      HTMLDirectoryElement: qt,
      HTMLDivElement: qt,
      HTMLDListElement: qt,
      HTMLDocument: qt,
      HTMLElement: qt,
      HTMLEmbedElement: qt,
      HTMLFieldSetElement: qt,
      HTMLFontElement: qt,
      HTMLFormControlsCollection: qt,
      HTMLFormElement: qt,
      HTMLFrameElement: qt,
      HTMLFrameSetElement: qt,
      HTMLHeadElement: qt,
      HTMLHeadingElement: qt,
      HTMLHRElement: qt,
      HTMLHtmlElement: qt,
      HTMLIFrameElement: qt,
      HTMLImageElement: qt,
      HTMLInputElement: qt,
      HTMLLabelElement: qt,
      HTMLLegendElement: qt,
      HTMLLIElement: qt,
      HTMLLinkElement: qt,
      HTMLMapElement: qt,
      HTMLMarqueeElement: qt,
      HTMLMediaElement: qt,
      HTMLMenuElement: qt,
      HTMLMetaElement: qt,
      HTMLMeterElement: qt,
      HTMLModElement: qt,
      HTMLObjectElement: qt,
      HTMLOListElement: qt,
      HTMLOptGroupElement: qt,
      HTMLOptionElement: qt,
      HTMLOptionsCollection: qt,
      HTMLOutputElement: qt,
      HTMLParagraphElement: qt,
      HTMLParamElement: qt,
      HTMLPictureElement: qt,
      HTMLPreElement: qt,
      HTMLProgressElement: qt,
      HTMLQuoteElement: qt,
      HTMLScriptElement: qt,
      HTMLSelectElement: qt,
      HTMLShadowElement: qt,
      HTMLSlotElement: qt,
      HTMLSourceElement: qt,
      HTMLSpanElement: qt,
      HTMLStyleElement: qt,
      HTMLTableCaptionElement: qt,
      HTMLTableCellElement: qt,
      HTMLTableColElement: qt,
      HTMLTableElement: qt,
      HTMLTableRowElement: qt,
      HTMLTableSectionElement: qt,
      HTMLTemplateElement: qt,
      HTMLTextAreaElement: qt,
      HTMLTimeElement: qt,
      HTMLTitleElement: qt,
      HTMLTrackElement: qt,
      HTMLUListElement: qt,
      HTMLUnknownElement: qt,
      HTMLVideoElement: qt,
      IDBCursor: qt,
      IDBCursorWithValue: qt,
      IDBDatabase: qt,
      IDBFactory: qt,
      IDBIndex: qt,
      IDBKeyRange: qt,
      IDBObjectStore: qt,
      IDBOpenDBRequest: qt,
      IDBRequest: qt,
      IDBTransaction: qt,
      IDBVersionChangeEvent: qt,
      IdleDeadline: qt,
      IIRFilterNode: qt,
      Image: qt,
      ImageBitmap: qt,
      ImageBitmapRenderingContext: qt,
      ImageCapture: qt,
      ImageData: qt,
      indexedDB: Gt,
      innerHeight: Gt,
      innerWidth: Gt,
      InputEvent: qt,
      IntersectionObserver: qt,
      IntersectionObserverEntry: qt,
      isSecureContext: Gt,
      KeyboardEvent: qt,
      KeyframeEffect: qt,
      length: Gt,
      localStorage: Gt,
      location: Gt,
      Location: qt,
      locationbar: Gt,
      matchMedia: Gt,
      MediaDeviceInfo: qt,
      MediaDevices: qt,
      MediaElementAudioSourceNode: qt,
      MediaEncryptedEvent: qt,
      MediaError: qt,
      MediaKeyMessageEvent: qt,
      MediaKeySession: qt,
      MediaKeyStatusMap: qt,
      MediaKeySystemAccess: qt,
      MediaList: qt,
      MediaQueryList: qt,
      MediaQueryListEvent: qt,
      MediaRecorder: qt,
      MediaSettingsRange: qt,
      MediaSource: qt,
      MediaStream: qt,
      MediaStreamAudioDestinationNode: qt,
      MediaStreamAudioSourceNode: qt,
      MediaStreamEvent: qt,
      MediaStreamTrack: qt,
      MediaStreamTrackEvent: qt,
      menubar: Gt,
      MessageChannel: qt,
      MessageEvent: qt,
      MessagePort: qt,
      MIDIAccess: qt,
      MIDIConnectionEvent: qt,
      MIDIInput: qt,
      MIDIInputMap: qt,
      MIDIMessageEvent: qt,
      MIDIOutput: qt,
      MIDIOutputMap: qt,
      MIDIPort: qt,
      MimeType: qt,
      MimeTypeArray: qt,
      MouseEvent: qt,
      moveBy: Gt,
      moveTo: Gt,
      MutationEvent: qt,
      MutationObserver: qt,
      MutationRecord: qt,
      name: Gt,
      NamedNodeMap: qt,
      NavigationPreloadManager: qt,
      navigator: Gt,
      Navigator: qt,
      NetworkInformation: qt,
      Node: qt,
      NodeFilter: Gt,
      NodeIterator: qt,
      NodeList: qt,
      Notification: qt,
      OfflineAudioCompletionEvent: qt,
      OfflineAudioContext: qt,
      offscreenBuffering: Gt,
      OffscreenCanvas: qt,
      open: Gt,
      openDatabase: Gt,
      Option: qt,
      origin: Gt,
      OscillatorNode: qt,
      outerHeight: Gt,
      outerWidth: Gt,
      PageTransitionEvent: qt,
      pageXOffset: Gt,
      pageYOffset: Gt,
      PannerNode: qt,
      parent: Gt,
      Path2D: qt,
      PaymentAddress: qt,
      PaymentRequest: qt,
      PaymentRequestUpdateEvent: qt,
      PaymentResponse: qt,
      performance: Gt,
      Performance: qt,
      PerformanceEntry: qt,
      PerformanceLongTaskTiming: qt,
      PerformanceMark: qt,
      PerformanceMeasure: qt,
      PerformanceNavigation: qt,
      PerformanceNavigationTiming: qt,
      PerformanceObserver: qt,
      PerformanceObserverEntryList: qt,
      PerformancePaintTiming: qt,
      PerformanceResourceTiming: qt,
      PerformanceTiming: qt,
      PeriodicWave: qt,
      Permissions: qt,
      PermissionStatus: qt,
      personalbar: Gt,
      PhotoCapabilities: qt,
      Plugin: qt,
      PluginArray: qt,
      PointerEvent: qt,
      PopStateEvent: qt,
      postMessage: Gt,
      Presentation: qt,
      PresentationAvailability: qt,
      PresentationConnection: qt,
      PresentationConnectionAvailableEvent: qt,
      PresentationConnectionCloseEvent: qt,
      PresentationConnectionList: qt,
      PresentationReceiver: qt,
      PresentationRequest: qt,
      print: Gt,
      ProcessingInstruction: qt,
      ProgressEvent: qt,
      PromiseRejectionEvent: qt,
      prompt: Gt,
      PushManager: qt,
      PushSubscription: qt,
      PushSubscriptionOptions: qt,
      queueMicrotask: Gt,
      RadioNodeList: qt,
      Range: qt,
      ReadableStream: qt,
      RemotePlayback: qt,
      removeEventListener: Gt,
      Request: qt,
      requestAnimationFrame: Gt,
      requestIdleCallback: Gt,
      resizeBy: Gt,
      ResizeObserver: qt,
      ResizeObserverEntry: qt,
      resizeTo: Gt,
      Response: qt,
      RTCCertificate: qt,
      RTCDataChannel: qt,
      RTCDataChannelEvent: qt,
      RTCDtlsTransport: qt,
      RTCIceCandidate: qt,
      RTCIceTransport: qt,
      RTCPeerConnection: qt,
      RTCPeerConnectionIceEvent: qt,
      RTCRtpReceiver: qt,
      RTCRtpSender: qt,
      RTCSctpTransport: qt,
      RTCSessionDescription: qt,
      RTCStatsReport: qt,
      RTCTrackEvent: qt,
      screen: Gt,
      Screen: qt,
      screenLeft: Gt,
      ScreenOrientation: qt,
      screenTop: Gt,
      screenX: Gt,
      screenY: Gt,
      ScriptProcessorNode: qt,
      scroll: Gt,
      scrollbars: Gt,
      scrollBy: Gt,
      scrollTo: Gt,
      scrollX: Gt,
      scrollY: Gt,
      SecurityPolicyViolationEvent: qt,
      Selection: qt,
      ServiceWorker: qt,
      ServiceWorkerContainer: qt,
      ServiceWorkerRegistration: qt,
      sessionStorage: Gt,
      ShadowRoot: qt,
      SharedWorker: qt,
      SourceBuffer: qt,
      SourceBufferList: qt,
      speechSynthesis: Gt,
      SpeechSynthesisEvent: qt,
      SpeechSynthesisUtterance: qt,
      StaticRange: qt,
      status: Gt,
      statusbar: Gt,
      StereoPannerNode: qt,
      stop: Gt,
      Storage: qt,
      StorageEvent: qt,
      StorageManager: qt,
      styleMedia: Gt,
      StyleSheet: qt,
      StyleSheetList: qt,
      SubtleCrypto: qt,
      SVGAElement: qt,
      SVGAngle: qt,
      SVGAnimatedAngle: qt,
      SVGAnimatedBoolean: qt,
      SVGAnimatedEnumeration: qt,
      SVGAnimatedInteger: qt,
      SVGAnimatedLength: qt,
      SVGAnimatedLengthList: qt,
      SVGAnimatedNumber: qt,
      SVGAnimatedNumberList: qt,
      SVGAnimatedPreserveAspectRatio: qt,
      SVGAnimatedRect: qt,
      SVGAnimatedString: qt,
      SVGAnimatedTransformList: qt,
      SVGAnimateElement: qt,
      SVGAnimateMotionElement: qt,
      SVGAnimateTransformElement: qt,
      SVGAnimationElement: qt,
      SVGCircleElement: qt,
      SVGClipPathElement: qt,
      SVGComponentTransferFunctionElement: qt,
      SVGDefsElement: qt,
      SVGDescElement: qt,
      SVGDiscardElement: qt,
      SVGElement: qt,
      SVGEllipseElement: qt,
      SVGFEBlendElement: qt,
      SVGFEColorMatrixElement: qt,
      SVGFEComponentTransferElement: qt,
      SVGFECompositeElement: qt,
      SVGFEConvolveMatrixElement: qt,
      SVGFEDiffuseLightingElement: qt,
      SVGFEDisplacementMapElement: qt,
      SVGFEDistantLightElement: qt,
      SVGFEDropShadowElement: qt,
      SVGFEFloodElement: qt,
      SVGFEFuncAElement: qt,
      SVGFEFuncBElement: qt,
      SVGFEFuncGElement: qt,
      SVGFEFuncRElement: qt,
      SVGFEGaussianBlurElement: qt,
      SVGFEImageElement: qt,
      SVGFEMergeElement: qt,
      SVGFEMergeNodeElement: qt,
      SVGFEMorphologyElement: qt,
      SVGFEOffsetElement: qt,
      SVGFEPointLightElement: qt,
      SVGFESpecularLightingElement: qt,
      SVGFESpotLightElement: qt,
      SVGFETileElement: qt,
      SVGFETurbulenceElement: qt,
      SVGFilterElement: qt,
      SVGForeignObjectElement: qt,
      SVGGElement: qt,
      SVGGeometryElement: qt,
      SVGGradientElement: qt,
      SVGGraphicsElement: qt,
      SVGImageElement: qt,
      SVGLength: qt,
      SVGLengthList: qt,
      SVGLinearGradientElement: qt,
      SVGLineElement: qt,
      SVGMarkerElement: qt,
      SVGMaskElement: qt,
      SVGMatrix: qt,
      SVGMetadataElement: qt,
      SVGMPathElement: qt,
      SVGNumber: qt,
      SVGNumberList: qt,
      SVGPathElement: qt,
      SVGPatternElement: qt,
      SVGPoint: qt,
      SVGPointList: qt,
      SVGPolygonElement: qt,
      SVGPolylineElement: qt,
      SVGPreserveAspectRatio: qt,
      SVGRadialGradientElement: qt,
      SVGRect: qt,
      SVGRectElement: qt,
      SVGScriptElement: qt,
      SVGSetElement: qt,
      SVGStopElement: qt,
      SVGStringList: qt,
      SVGStyleElement: qt,
      SVGSVGElement: qt,
      SVGSwitchElement: qt,
      SVGSymbolElement: qt,
      SVGTextContentElement: qt,
      SVGTextElement: qt,
      SVGTextPathElement: qt,
      SVGTextPositioningElement: qt,
      SVGTitleElement: qt,
      SVGTransform: qt,
      SVGTransformList: qt,
      SVGTSpanElement: qt,
      SVGUnitTypes: qt,
      SVGUseElement: qt,
      SVGViewElement: qt,
      TaskAttributionTiming: qt,
      Text: qt,
      TextEvent: qt,
      TextMetrics: qt,
      TextTrack: qt,
      TextTrackCue: qt,
      TextTrackCueList: qt,
      TextTrackList: qt,
      TimeRanges: qt,
      toolbar: Gt,
      top: Gt,
      Touch: qt,
      TouchEvent: qt,
      TouchList: qt,
      TrackEvent: qt,
      TransitionEvent: qt,
      TreeWalker: qt,
      UIEvent: qt,
      ValidityState: qt,
      visualViewport: Gt,
      VisualViewport: qt,
      VTTCue: qt,
      WaveShaperNode: qt,
      WebAssembly: Gt,
      WebGL2RenderingContext: qt,
      WebGLActiveInfo: qt,
      WebGLBuffer: qt,
      WebGLContextEvent: qt,
      WebGLFramebuffer: qt,
      WebGLProgram: qt,
      WebGLQuery: qt,
      WebGLRenderbuffer: qt,
      WebGLRenderingContext: qt,
      WebGLSampler: qt,
      WebGLShader: qt,
      WebGLShaderPrecisionFormat: qt,
      WebGLSync: qt,
      WebGLTexture: qt,
      WebGLTransformFeedback: qt,
      WebGLUniformLocation: qt,
      WebGLVertexArrayObject: qt,
      WebSocket: qt,
      WheelEvent: qt,
      Window: qt,
      Worker: qt,
      WritableStream: qt,
      XMLDocument: qt,
      XMLHttpRequest: qt,
      XMLHttpRequestEventTarget: qt,
      XMLHttpRequestUpload: qt,
      XMLSerializer: qt,
      XPathEvaluator: qt,
      XPathExpression: qt,
      XPathResult: qt,
      XSLTProcessor: qt,
    };
  for (const e of ["window", "global", "self", "globalThis"]) Qt[e] = Qt;
  function Jt(e) {
    let t = Qt;
    for (const s of e) {
      if ("string" != typeof s) return null;
      if (!(t = t[s])) return null;
    }
    return t[jt];
  }
  class Zt extends at {
    hasEffectsWhenAccessedAtPath(e) {
      return !(function(e) {
        return 1 === e.length
          ? "undefined" === e[0] || null !== Jt(e)
          : null !== Jt(e.slice(0, -1));
      })([this.name, ...e]);
    }
    hasEffectsWhenCalledAtPath(e) {
      return !(function(e) {
        const t = Jt(e);
        return null !== t && t.pure;
      })([this.name, ...e]);
    }
  }
  class es extends Tt {
    constructor() {
      super(...arguments), (this.variable = null), (this.bound = !1);
    }
    addExportedVariables(e) {
      null !== this.variable &&
        this.variable.exportName &&
        e.push(this.variable);
    }
    bind() {
      this.bound ||
        ((this.bound = !0),
        null === this.variable &&
          (function e(t, s) {
            if ("MemberExpression" === t.type)
              return !t.computed && e(t.object, t);
            if ("Identifier" === t.type) {
              if (!s) return !0;
              switch (s.type) {
                case "MemberExpression":
                  return s.computed || t === s.object;
                case "MethodDefinition":
                  return s.computed;
                case "Property":
                  return s.computed || t === s.value;
                case "ExportSpecifier":
                case "ImportSpecifier":
                  return t === s.local;
                case "LabeledStatement":
                case "BreakStatement":
                case "ContinueStatement":
                  return !1;
                default:
                  return !0;
              }
            }
            return !1;
          })(this, this.parent) &&
          ((this.variable = this.scope.findVariable(this.name)),
          this.variable.addReference(this)),
        null !== this.variable &&
          this.variable instanceof wt &&
          null !== this.variable.additionalInitializers &&
          this.variable.consolidateInitializers());
    }
    declare(e, t) {
      let s;
      switch (e) {
        case "var":
          s = this.scope.addDeclaration(this, this.context, t, !0);
          break;
        case "function":
          s = this.scope.addDeclaration(this, this.context, t, "function");
          break;
        case "let":
        case "const":
        case "class":
          s = this.scope.addDeclaration(this, this.context, t, !1);
          break;
        case "parameter":
          s = this.scope.addParameterDeclaration(this);
          break;
        default:
          throw new Error(`Internal Error: Unexpected identifier kind ${e}.`);
      }
      return [(this.variable = s)];
    }
    deoptimizePath(e) {
      this.bound || this.bind(),
        0 !== e.length ||
          this.scope.contains(this.name) ||
          this.disallowImportReassignment(),
        this.variable.deoptimizePath(e);
    }
    getLiteralValueAtPath(e, t, s) {
      return (
        this.bound || this.bind(), this.variable.getLiteralValueAtPath(e, t, s)
      );
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      return (
        this.bound || this.bind(),
        this.variable.getReturnExpressionWhenCalledAtPath(e, t, s)
      );
    }
    hasEffects() {
      return (
        this.context.unknownGlobalSideEffects &&
        this.variable instanceof Zt &&
        this.variable.hasEffectsWhenAccessedAtPath(Q)
      );
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      return (
        null !== this.variable &&
        this.variable.hasEffectsWhenAccessedAtPath(e, t)
      );
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return !this.variable || this.variable.hasEffectsWhenAssignedAtPath(e, t);
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return (
        !this.variable || this.variable.hasEffectsWhenCalledAtPath(e, t, s)
      );
    }
    include(e) {
      this.included ||
        ((this.included = !0),
        null !== this.variable &&
          this.context.includeVariable(e, this.variable));
    }
    includeCallArguments(e, t) {
      this.variable.includeCallArguments(e, t);
    }
    render(
      e,
      t,
      {
        renderedParentType: s,
        isCalleeOfRenderedParent: n,
        isShorthandProperty: i,
      } = Wt
    ) {
      if (this.variable) {
        const t = this.variable.getName();
        t !== this.name &&
          (e.overwrite(this.start, this.end, t, {
            contentOnly: !0,
            storeName: !0,
          }),
          i && e.prependRight(this.start, `${this.name}: `)),
          "eval" === t && s === he && n && e.appendRight(this.start, "0, ");
      }
    }
    disallowImportReassignment() {
      this.context.error(
        {
          code: "ILLEGAL_REASSIGNMENT",
          message: `Illegal reassignment to import '${this.name}'`,
        },
        this.start
      );
    }
  }
  class ts extends Tt {
    constructor() {
      super(...arguments), (this.declarationInit = null);
    }
    addExportedVariables(e) {
      this.argument.addExportedVariables(e);
    }
    bind() {
      super.bind(),
        null !== this.declarationInit &&
          this.declarationInit.deoptimizePath([X, X]);
    }
    declare(e, t) {
      return (this.declarationInit = t), this.argument.declare(e, Re);
    }
    deoptimizePath(e) {
      0 === e.length && this.argument.deoptimizePath(Q);
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return e.length > 0 || this.argument.hasEffectsWhenAssignedAtPath(Q, t);
    }
  }
  class ss extends Tt {
    constructor() {
      super(...arguments), (this.isPrototypeDeoptimized = !1);
    }
    createScope(e) {
      this.scope = new Ft(e, this.context);
    }
    deoptimizePath(e) {
      1 === e.length &&
        ("prototype" === e[0]
          ? (this.isPrototypeDeoptimized = !0)
          : e[0] === X &&
            ((this.isPrototypeDeoptimized = !0),
            this.scope.getReturnExpression().deoptimizePath(J)));
    }
    getReturnExpressionWhenCalledAtPath(e) {
      return 0 === e.length ? this.scope.getReturnExpression() : Re;
    }
    hasEffects() {
      return null !== this.id && this.id.hasEffects();
    }
    hasEffectsWhenAccessedAtPath(e) {
      return (
        !(e.length <= 1) &&
        (e.length > 2 || "prototype" !== e[0] || this.isPrototypeDeoptimized)
      );
    }
    hasEffectsWhenAssignedAtPath(e) {
      return (
        !(e.length <= 1) &&
        (e.length > 2 || "prototype" !== e[0] || this.isPrototypeDeoptimized)
      );
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      if (e.length > 0) return !0;
      for (const e of this.params) if (e.hasEffects(s)) return !0;
      const n = s.replacedVariableInits.get(this.scope.thisVariable);
      s.replacedVariableInits.set(
        this.scope.thisVariable,
        t.withNew ? new Je() : Re
      );
      const { brokenFlow: i, ignore: r } = s;
      return (
        (s.ignore = {
          breaks: !1,
          continues: !1,
          labels: new Set(),
          returnAwaitYield: !0,
        }),
        !!this.body.hasEffects(s) ||
          ((s.brokenFlow = i),
          n
            ? s.replacedVariableInits.set(this.scope.thisVariable, n)
            : s.replacedVariableInits.delete(this.scope.thisVariable),
          (s.ignore = r),
          !1)
      );
    }
    include(e, t) {
      (this.included = !0), this.id && this.id.include(e);
      const s = this.scope.argumentsVariable.included;
      for (const n of this.params) (n instanceof es && !s) || n.include(e, t);
      const { brokenFlow: n } = e;
      (e.brokenFlow = se), this.body.include(e, t), (e.brokenFlow = n);
    }
    includeCallArguments(e, t) {
      this.scope.includeCallArguments(e, t);
    }
    initialise() {
      null !== this.id && this.id.declare("function", this),
        this.scope.addParameterVariables(
          this.params.map((e) => e.declare("parameter", Re)),
          this.params[this.params.length - 1] instanceof ts
        ),
        this.body.addImplicitReturnExpressionToScope();
    }
    parseNode(e) {
      (this.body = new this.context.nodeConstructors.BlockStatement(
        e.body,
        this,
        this.scope.hoistedBodyVarScope
      )),
        super.parseNode(e);
    }
  }
  ss.prototype.preventChildBlockScope = !0;
  class ns extends ss {
    initialise() {
      super.initialise(), null !== this.id && (this.id.variable.isId = !0);
    }
    parseNode(e) {
      null !== e.id &&
        (this.id = new this.context.nodeConstructors.Identifier(
          e.id,
          this,
          this.scope.parent
        )),
        super.parseNode(e);
    }
  }
  const is = /\s/;
  class rs extends Tt {
    include(e, t) {
      super.include(e, t), t && this.context.includeVariable(e, this.variable);
    }
    initialise() {
      const e = this.declaration;
      (this.declarationName = (e.id && e.id.name) || this.declaration.name),
        (this.variable = this.scope.addExportDefaultDeclaration(
          this.declarationName || this.context.getModuleName(),
          this,
          this.context
        )),
        this.context.addExport(this);
    }
    render(e, t, s) {
      const { start: n, end: i } = s,
        r = (function(e, t = 0) {
          for (t = ve(e, "default", t) + 7; is.test(e[t]); ) t++;
          return t;
        })(e.original, this.start);
      if (this.declaration instanceof ns)
        this.renderNamedDeclaration(
          e,
          r,
          "function",
          null === this.declaration.id,
          t
        );
      else if (this.declaration instanceof Mt)
        this.renderNamedDeclaration(
          e,
          r,
          "class",
          null === this.declaration.id,
          t
        );
      else {
        if (this.variable.getOriginalVariable() !== this.variable)
          return void ("system" === t.format && this.variable.exportName
            ? e.overwrite(
                n,
                i,
                `exports('${
                  this.variable.exportName
                }', ${this.variable.getName()});`
              )
            : ye(this, e, n, i));
        if (!this.variable.included)
          return (
            e.remove(this.start, r),
            this.declaration.render(e, t, {
              isCalleeOfRenderedParent: !1,
              renderedParentType: ce,
            }),
            void (
              ";" !== e.original[this.end - 1] && e.appendLeft(this.end, ";")
            )
          );
        this.renderVariableDeclaration(e, r, t);
      }
      this.declaration.render(e, t);
    }
    renderNamedDeclaration(e, t, s, n, i) {
      const r = this.variable.getName();
      e.remove(this.start, t),
        n &&
          e.appendLeft(
            (function(e, t, s = 0) {
              const n = ve(e, t, s) + t.length;
              e = e.slice(n, ve(e, "{", n));
              const i = ve(e, "*");
              return -1 === i ? n : n + i + 1;
            })(e.original, s, t),
            ` ${r}`
          ),
        "system" === i.format &&
          this.declaration instanceof Mt &&
          this.variable.exportName &&
          e.appendLeft(
            this.end,
            ` exports('${this.variable.exportName}', ${r});`
          );
    }
    renderVariableDeclaration(e, t, s) {
      const n =
        "system" === s.format && this.variable.exportName
          ? `exports('${this.variable.exportName}', `
          : "";
      e.overwrite(
        this.start,
        t,
        `${s.varOrConst} ${this.variable.getName()} = ${n}`
      );
      const i = 59 === e.original.charCodeAt(this.end - 1);
      n
        ? e.appendRight(i ? this.end - 1 : this.end, ")" + (i ? "" : ";"))
        : i || e.appendLeft(this.end, ";");
    }
  }
  rs.prototype.needsBoundaries = !0;
  class as extends wt {
    constructor(e, t, s) {
      super(e, t, t.declaration, s),
        (this.hasId = !1),
        (this.originalId = null),
        (this.originalVariable = null);
      const n = t.declaration;
      (n instanceof ns || n instanceof Mt) && n.id
        ? ((this.hasId = !0), (this.originalId = n.id))
        : n instanceof es && (this.originalId = n);
    }
    addReference(e) {
      this.hasId || (this.name = e.name);
    }
    getAssignedVariableName() {
      return (this.originalId && this.originalId.name) || null;
    }
    getBaseVariableName() {
      const e = this.getOriginalVariable();
      return e === this ? super.getBaseVariableName() : e.getBaseVariableName();
    }
    getName() {
      const e = this.getOriginalVariable();
      return e === this ? super.getName() : e.getName();
    }
    getOriginalVariable() {
      if (null === this.originalVariable)
        if (
          !this.originalId ||
          (!this.hasId && this.originalId.variable.isReassigned)
        )
          this.originalVariable = this;
        else {
          const e = this.originalId.variable;
          this.originalVariable = e instanceof as ? e.getOriginalVariable() : e;
        }
      return this.originalVariable;
    }
    setRenderNames(e, t) {
      const s = this.getOriginalVariable();
      s === this ? super.setRenderNames(e, t) : s.setRenderNames(e, t);
    }
    setSafeName(e) {
      const t = this.getOriginalVariable();
      t === this ? super.setSafeName(e) : t.setSafeName(e);
    }
  }
  const os = "_missingExportShim",
    hs = "_interopDefault",
    ls = "_interopNamespace";
  class cs extends at {
    constructor(e) {
      super(os), (this.module = e);
    }
  }
  class us extends at {
    constructor(e) {
      super(e.getModuleName()),
        (this.memberVariables = Object.create(null)),
        (this.containsExternalNamespace = !1),
        (this.referencedEarly = !1),
        (this.references = []),
        (this.context = e),
        (this.module = e.module);
    }
    addReference(e) {
      this.references.push(e), (this.name = e.name);
    }
    deoptimizePath() {
      for (const e in this.memberVariables)
        this.memberVariables[e].deoptimizePath(J);
    }
    include(e) {
      if (!this.included) {
        this.containsExternalNamespace &&
          this.context.error(
            {
              code: "NAMESPACE_CANNOT_CONTAIN_EXTERNAL",
              id: this.module.id,
              message: `Cannot create an explicit namespace object for module "${this.context.getModuleName()}" because it contains a reexported external namespace`,
            },
            void 0
          ),
          (this.included = !0);
        for (const e of this.references)
          if (
            e.context.getModuleExecIndex() <= this.context.getModuleExecIndex()
          ) {
            this.referencedEarly = !0;
            break;
          }
        if (this.context.preserveModules)
          for (const t of Object.keys(this.memberVariables))
            this.memberVariables[t].include(e);
        else
          for (const t of Object.keys(this.memberVariables))
            this.context.includeVariable(e, this.memberVariables[t]);
      }
    }
    initialise() {
      for (const e of this.context
        .getExports()
        .concat(this.context.getReexports()))
        "*" === e[0] && e.length > 1 && (this.containsExternalNamespace = !0),
          (this.memberVariables[e] = this.context.traceExport(e));
    }
    renderBlock(e) {
      const t = e.compact ? "" : " ",
        s = e.compact ? "" : "\n",
        n = e.indent,
        i = Object.keys(this.memberVariables).map((s) => {
          const i = this.memberVariables[s];
          if (this.referencedEarly || i.isReassigned)
            return `${n}get ${s}${t}()${t}{${t}return ${i.getName()}${
              e.compact ? "" : ";"
            }${t}}`;
          const r = Ne[s] ? `'${s}'` : s;
          return `${n}${r}: ${i.getName()}`;
        });
      i.unshift(`${n}__proto__:${t}null`),
        e.namespaceToStringTag &&
          i.unshift(`${n}[Symbol.toStringTag]:${t}'Module'`);
      const r = this.getName(),
        a = e.freeze ? "/*#__PURE__*/Object.freeze" : "",
        o = i.join(`,${s}`);
      let h = `${e.varOrConst} ${r}${t}=${t}${a}({${s}${o}${s}});`;
      return (
        "system" === e.format &&
          this.exportName &&
          (h += `${s}exports('${this.exportName}',${t}${r});`),
        h
      );
    }
    renderFirst() {
      return this.referencedEarly;
    }
  }
  us.prototype.isNamespace = !0;
  const ds = "Object.defineProperty(exports, '__esModule', { value: true });",
    ps = "Object.defineProperty(exports,'__esModule',{value:true});";
  function fs(e, t, s, n, i, r, a = "return ") {
    const o = i ? "" : " ",
      h = i ? "" : "\n";
    if (!s) {
      let s;
      if (e.length > 0) s = e[0].local;
      else
        for (const e of t)
          if (e.reexports) {
            const t = e.reexports[0];
            s =
              e.namedExportsMode &&
              "*" !== t.imported &&
              "default" !== t.imported
                ? `${e.name}.${t.imported}`
                : e.name;
          }
      return `${a}${s};`;
    }
    let l = "";
    for (const { name: e, reexports: n } of t)
      if (n && s)
        for (const t of n)
          "*" === t.reexported &&
            (l && (l += h),
            t.needsLiveBinding
              ? (l +=
                  `Object.keys(${e}).forEach(function${o}(k)${o}{${h}` +
                  `${r}if${o}(k${o}!==${o}'default')${o}Object.defineProperty(exports,${o}k,${o}{${h}` +
                  `${r}${r}enumerable:${o}true,${h}` +
                  `${r}${r}get:${o}function${o}()${o}{${h}` +
                  `${r}${r}${r}return ${e}[k];${h}` +
                  `${r}${r}}${h}${r}});${h}});`)
              : (l +=
                  `Object.keys(${e}).forEach(function${o}(k)${o}{${h}` +
                  `${r}if${o}(k${o}!==${o}'default')${o}exports[k]${o}=${o}${e}[k];${h}});`));
    for (const {
      name: e,
      imports: i,
      reexports: a,
      isChunk: c,
      namedExportsMode: u,
      exportsNames: d,
    } of t)
      if (a && s)
        for (const t of a)
          if ("default" !== t.imported || c)
            if ("*" !== t.imported) {
              l && (l += h);
              const s =
                "default" !== t.imported || u ? `${e}.${t.imported}` : e;
              l += t.needsLiveBinding
                ? `Object.defineProperty(exports,${o}'${t.reexported}',${o}{${h}` +
                  `${r}enumerable:${o}true,${h}` +
                  `${r}get:${o}function${o}()${o}{${h}` +
                  `${r}${r}return ${s};${h}${r}}${h}});`
                : `exports.${t.reexported}${o}=${o}${s};`;
            } else
              "*" !== t.reexported &&
                (l && (l += h), (l += `exports.${t.reexported}${o}=${o}${e};`));
          else
            l && (l += h),
              d &&
              (a.some((e) =>
                "default" === e.imported
                  ? "default" === e.reexported
                  : "*" !== e.imported
              ) ||
                (i && i.some((e) => "default" !== e.imported)))
                ? (l += `exports.${t.reexported}${o}=${o}${e}${
                    !1 !== n ? "__default" : ".default"
                  };`)
                : (l += `exports.${t.reexported}${o}=${o}${e};`);
    for (const t of e) {
      const e = `exports.${t.exported}`,
        s = t.local;
      e !== s && (l && (l += h), (l += `${e}${o}=${o}${s};`));
    }
    return l;
  }
  function ms(e, t, s) {
    const n = t.compact ? "" : " ";
    return e
      .map(
        ({
          name: e,
          exportsNames: i,
          exportsDefault: r,
          namedExportsMode: a,
        }) =>
          a && r && !1 !== t.interop
            ? i
              ? `${s} ${e}__default${n}=${n}'default'${n}in ${e}${n}?` +
                `${n}${e}['default']${n}:${n}${e};`
              : `${e}${n}=${n}${e}${n}&&${n}${e}.hasOwnProperty('default')${n}?` +
                `${n}${e}['default']${n}:${n}${e};`
            : null
      )
      .filter(Boolean)
      .join(t.compact ? "" : "\n");
  }
  function gs(e, t, s, n) {
    return (
      `${n}var d${e}=${e}Object.getOwnPropertyDescriptor(e,${e}k);${t}` +
      `${n}Object.defineProperty(n,${e}k,${e}d.get${e}?${e}d${e}:${e}{${t}` +
      `${n}${s}enumerable:${e}true,${t}` +
      `${n}${s}get:${e}function${e}()${e}{${t}` +
      `${n}${s}${s}return e[k];${t}` +
      `${n}${s}}${t}` +
      `${n}});${t}`
    );
  }
  function xs(e, t, s, n) {
    return `${n}n[k]${e}=e${e}[k];${t}`;
  }
  function ys(e, t, s, n) {
    return (
      `function ${ls}(e)${e}{${t}` +
      `${s}if${e}(e${e}&&${e}e.__esModule)${e}{${e}return e;${e}}${e}else${e}{${t}` +
      `${s}${s}var n${e}=${e}{};${t}` +
      `${s}${s}if${e}(e)${e}{${t}` +
      `${s}${s}${s}Object.keys(e).forEach(function${e}(k)${e}{${t}` +
      (n ? gs : xs)(e, t, s, s + s + s + s) +
      `${s}${s}${s}});${t}` +
      `${s}${s}}${t}` +
      `${s}${s}n['default']${e}=${e}e;${t}` +
      `${s}${s}return n;${t}` +
      `${s}}${t}` +
      `}${t}${t}`
    );
  }
  const Es = {
    assert: !0,
    buffer: !0,
    console: !0,
    constants: !0,
    domain: !0,
    events: !0,
    http: !0,
    https: !0,
    os: !0,
    path: !0,
    process: !0,
    punycode: !0,
    querystring: !0,
    stream: !0,
    string_decoder: !0,
    timers: !0,
    tty: !0,
    url: !0,
    util: !0,
    vm: !0,
    zlib: !0,
  };
  function bs(e, t) {
    const s = t.map(({ id: e }) => e).filter((e) => e in Es);
    s.length &&
      e({
        code: "MISSING_NODE_BUILTINS",
        message: `Creating a browser bundle that depends on Node.js built-in ${
          1 === s.length
            ? `module ('${s[0]}')`
            : `modules (${s
                .slice(0, -1)
                .map((e) => `'${e}'`)
                .join(", ")} and '${s.slice(-1)}')`
        }. You might need to include https://www.npmjs.com/package/rollup-plugin-node-builtins`,
        modules: s,
      });
  }
  function vs(e) {
    return e.replace(/^\t+/, (e) => e.split("\t").join("  "));
  }
  function Ss(e, t, s) {
    let n = e.split("\n");
    const i = Math.max(0, t - 3);
    let r = Math.min(t + 2, n.length);
    for (n = n.slice(i, r); !/\S/.test(n[n.length - 1]); ) n.pop(), (r -= 1);
    const a = String(r).length;
    return n
      .map((e, n) => {
        const r = i + n + 1 === t;
        let o = String(n + i + 1);
        for (; o.length < a; ) o = ` ${o}`;
        if (r) {
          const t =
            (function(e) {
              let t = "";
              for (; e--; ) t += " ";
              return t;
            })(a + 2 + vs(e.slice(0, s)).length) + "^";
          return `${o}: ${vs(e)}\n${t}`;
        }
        return `${o}: ${vs(e)}`;
      })
      .join("\n");
  }
  function As(e) {
    return e.replace(/[\0?*]/g, "_");
  }
  function Cs(e) {
    const t = Et(e);
    return t.substr(0, t.length - vt(e).length);
  }
  function ks(e) {
    return "undefined" != typeof process && gt(e) ? St(process.cwd(), e) : e;
  }
  function Ps(e) {
    return (
      "/" !== e[0] &&
      !("." === e[0] && ("/" === e[1] || "." === e[1])) &&
      As(e) === e
    );
  }
  function ws(e, t) {
    throw (e instanceof Error || (e = Object.assign(new Error(e.message), e)),
    t && Object.assign(e, t),
    e);
  }
  function Is(e, t, s, n) {
    if ("object" == typeof t) {
      const { line: s, column: i } = t;
      e.loc = { file: n, line: s, column: i };
    } else {
      e.pos = t;
      const { line: i, column: r } = $t(s, t, { offsetLine: 1 });
      e.loc = { file: n, line: i, column: r };
    }
    if (void 0 === e.frame) {
      const { line: t, column: n } = e.loc;
      e.frame = Ss(s, t, n);
    }
  }
  var Ns;
  function $s(e) {
    return {
      code: Ns.ASSET_SOURCE_MISSING,
      message: `Plugin error creating asset "${e}" - no asset source set.`,
    };
  }
  function _s(e) {
    return Object.assign(
      { code: Ns.DEPRECATED_FEATURE },
      "string" == typeof e ? { message: e } : e
    );
  }
  function Ls(e, t, s) {
    return {
      code: Ns.NAMESPACE_CONFLICT,
      message: `Conflicting namespaces: ${ks(
        t.id
      )} re-exports '${e}' from both ${ks(t.exportsAll[e])} and ${ks(
        s.exportsAll[e]
      )} (will be ignored)`,
      name: e,
      reexporter: t.id,
      sources: [t.exportsAll[e], s.exportsAll[e]],
    };
  }
  function Ts(e) {
    return { code: Ns.VALIDATION_ERROR, message: e };
  }
  !(function(e) {
    (e.ASSET_NOT_FINALISED = "ASSET_NOT_FINALISED"),
      (e.ASSET_NOT_FOUND = "ASSET_NOT_FOUND"),
      (e.ASSET_SOURCE_ALREADY_SET = "ASSET_SOURCE_ALREADY_SET"),
      (e.ASSET_SOURCE_MISSING = "ASSET_SOURCE_MISSING"),
      (e.BAD_LOADER = "BAD_LOADER"),
      (e.CANNOT_EMIT_FROM_OPTIONS_HOOK = "CANNOT_EMIT_FROM_OPTIONS_HOOK"),
      (e.CHUNK_NOT_GENERATED = "CHUNK_NOT_GENERATED"),
      (e.DEPRECATED_FEATURE = "DEPRECATED_FEATURE"),
      (e.FILE_NOT_FOUND = "FILE_NOT_FOUND"),
      (e.FILE_NAME_CONFLICT = "FILE_NAME_CONFLICT"),
      (e.INPUT_HOOK_IN_OUTPUT_PLUGIN = "INPUT_HOOK_IN_OUTPUT_PLUGIN"),
      (e.INVALID_CHUNK = "INVALID_CHUNK"),
      (e.INVALID_EXTERNAL_ID = "INVALID_EXTERNAL_ID"),
      (e.INVALID_OPTION = "INVALID_OPTION"),
      (e.INVALID_PLUGIN_HOOK = "INVALID_PLUGIN_HOOK"),
      (e.INVALID_ROLLUP_PHASE = "INVALID_ROLLUP_PHASE"),
      (e.NAMESPACE_CONFLICT = "NAMESPACE_CONFLICT"),
      (e.PLUGIN_ERROR = "PLUGIN_ERROR"),
      (e.UNRESOLVED_ENTRY = "UNRESOLVED_ENTRY"),
      (e.UNRESOLVED_IMPORT = "UNRESOLVED_IMPORT"),
      (e.VALIDATION_ERROR = "VALIDATION_ERROR");
  })(Ns || (Ns = {}));
  const Rs = /^[a-zA-Z$_][a-zA-Z0-9$_]*$/;
  function Ms(e) {
    return Rs.test(e) ? `.${e}` : `['${e}']`;
  }
  function Os(e) {
    return e
      .split(".")
      .map(Ms)
      .join("");
  }
  function Ds(e, t, s, n, i) {
    const r = n ? "" : " ",
      a = e.split(".");
    s && (a[0] = ("function" == typeof s ? s(a[0]) : s[a[0]]) || a[0]);
    const o = a.pop();
    let h = t,
      l = a
        .map((e) => ((h += Ms(e)), `${h}${r}=${r}${h}${r}||${r}{}`))
        .concat(`${h}${Ms(o)}`)
        .join(`,${r}`)
        .concat(`${r}=${r}${i}`);
    return a.length > 0 && (l = `(${l})`), l;
  }
  function Vs(e) {
    let t = e.length;
    for (; t--; ) {
      const s = e[t];
      if (s.exportsDefault || s.exportsNames) return e.slice(0, t + 1);
    }
    return [];
  }
  const Bs = (e) => `this${Os(e)}`;
  function Fs({ dependencies: e, exports: t }) {
    const s = new Set(t.map((e) => e.exported));
    s.has("default") || s.add("default");
    for (const { reexports: t } of e)
      if (t)
        for (const e of t)
          "*" === e.imported || s.has(e.reexported) || s.add(e.reexported);
    return s;
  }
  const Ws = (e, t, s, n, i) =>
      e
        ? `${i}${n}${t} _starExcludes${s}=${s}{${s}${Array.from(e).join(
            `:${s}1,${s}`
          )}${e.size ? `:${s}1` : ""}${s}};`
        : "",
    js = (e, t, s, n) => (e.length ? `${n}${s}var ${e.join(`,${t}`)};` : "");
  function Us(e, t, s, n) {
    return 0 === e.length
      ? ""
      : 1 === e.length
      ? `${s}${s}${s}exports('${e[0].name}',${t}${e[0].value});${n}${n}`
      : `${s}${s}${s}exports({${n}` +
        e
          .map(({ name: e, value: n }) => `${s}${s}${s}${s}${e}:${t}${n}`)
          .join(`,${n}`) +
        `${n}${s}${s}${s}});${n}${n}`;
  }
  const zs = (e, t, s, n) =>
      Us(
        e
          .filter((e) => e.hoisted || e.uninitialized)
          .map((e) => ({
            name: e.exported,
            value: e.uninitialized ? "void 0" : e.local,
          })),
        t,
        s,
        n
      ),
    Gs = (e, t, s, n) =>
      Us(
        e
          .filter((e) => e.local === os)
          .map((e) => ({ name: e.exported, value: os })),
        t,
        s,
        n
      );
  function Hs(e, t) {
    return e ? `${t}${Os(e)}` : "null";
  }
  var qs = {
    system: function(
      e,
      {
        accessedGlobals: t,
        dependencies: s,
        exports: n,
        hasExports: i,
        indentString: r,
        intro: a,
        outro: o,
        usesTopLevelAwait: h,
        varOrConst: l,
      },
      c
    ) {
      const u = c.compact ? "" : "\n",
        d = c.compact ? "" : " ",
        p = s.map((e) => `'${e.id}'`),
        f = [];
      let m;
      const g = [];
      for (const { imports: e, reexports: t } of s) {
        const i = [];
        if (e)
          for (const t of e)
            f.push(t.local),
              "*" === t.imported
                ? i.push(`${t.local}${d}=${d}module;`)
                : i.push(`${t.local}${d}=${d}module.${t.imported};`);
        if (t) {
          let e = !1;
          if (
            t.length > 1 ||
            (1 === t.length &&
              ("*" === t[0].reexported || "*" === t[0].imported))
          ) {
            for (const a of t)
              "*" === a.reexported &&
                (m || (m = Fs({ dependencies: s, exports: n })),
                e || (i.push(`${l} _setter${d}=${d}{};`), (e = !0)),
                i.push(`for${d}(var _$p${d}in${d}module)${d}{`),
                i.push(
                  `${r}if${d}(!_starExcludes[_$p])${d}_setter[_$p]${d}=${d}module[_$p];`
                ),
                i.push("}"));
            for (const e of t)
              "*" === e.imported &&
                "*" !== e.reexported &&
                i.push(`exports('${e.reexported}',${d}module);`);
            for (const s of t)
              "*" !== s.reexported &&
                "*" !== s.imported &&
                (e || (i.push(`${l} _setter${d}=${d}{};`), (e = !0)),
                i.push(
                  `_setter.${s.reexported}${d}=${d}module.${s.imported};`
                ));
            e && i.push("exports(_setter);");
          } else
            for (const e of t)
              i.push(`exports('${e.reexported}',${d}module.${e.imported});`);
        }
        g.push(i.join(`${u}${r}${r}${r}`));
      }
      const x = c.name ? `'${c.name}',${d}` : "",
        y = t.has("module") ? `exports,${d}module` : i ? "exports" : "";
      let E =
        `System.register(${x}[` +
        p.join(`,${d}`) +
        `],${d}function${d}(${y})${d}{${u}${r}${
          c.strict ? "'use strict';" : ""
        }` +
        Ws(m, l, d, r, u) +
        js(f, d, r, u) +
        `${u}${r}return${d}{${
          g.length
            ? `${u}${r}${r}setters:${d}[${g
                .map((e) =>
                  e
                    ? `function${d}(module)${d}{${u}${r}${r}${r}${e}${u}${r}${r}}`
                    : `function${d}()${d}{}`
                )
                .join(`,${d}`)}],`
            : ""
        }${u}`;
      E +=
        `${r}${r}execute:${d}${
          h ? `async${d}` : ""
        }function${d}()${d}{${u}${u}` + zs(n, d, r, u);
      const b =
        `${u}${u}` +
        Gs(n, d, r, u) +
        `${r}${r}}${u}${r}}${c.compact ? "" : ";"}${u}});`;
      return (
        a && e.prepend(a),
        o && e.append(o),
        e
          .indent(`${r}${r}${r}`)
          .append(b)
          .prepend(E)
      );
    },
    amd: function(
      e,
      {
        accessedGlobals: t,
        dependencies: s,
        exports: n,
        hasExports: i,
        indentString: r,
        intro: a,
        isEntryModuleFacade: o,
        namedExportsMode: h,
        outro: l,
        varOrConst: c,
        warn: u,
      },
      d
    ) {
      bs(u, s);
      const p = s.map(
          (e) =>
            `'${(function(e) {
              return "." === e[0] && e.endsWith(".js") ? e.slice(0, -3) : e;
            })(e.id)}'`
        ),
        f = s.map((e) => e.name),
        m = d.compact ? "" : "\n",
        g = d.compact ? "" : " ";
      h && i && (f.unshift("exports"), p.unshift("'exports'")),
        t.has("require") && (f.unshift("require"), p.unshift("'require'")),
        t.has("module") && (f.unshift("module"), p.unshift("'module'"));
      const x = d.amd || {},
        y =
          (x.id ? `'${x.id}',${g}` : "") +
          (p.length ? `[${p.join(`,${g}`)}],${g}` : ""),
        E = !1 !== d.strict ? `${g}'use strict';` : "",
        b = `${x.define || "define"}(${y}function${g}(${f.join(
          `,${g}`
        )})${g}{${E}${m}${m}`,
        v = ms(s, d, c);
      v && e.prepend(v + m + m),
        t.has(ls) && e.prepend(ys(g, m, r, !1 !== d.externalLiveBindings)),
        a && e.prepend(a);
      const S = fs(n, s, h, d.interop, d.compact, r);
      return (
        S && e.append(m + m + S),
        h && i && o && d.esModule && e.append(`${m}${m}${d.compact ? ps : ds}`),
        l && e.append(l),
        e
          .indent(r)
          .append(m + m + "});")
          .prepend(b)
      );
    },
    cjs: function(
      e,
      {
        accessedGlobals: t,
        dependencies: s,
        exports: n,
        hasExports: i,
        indentString: r,
        intro: a,
        isEntryModuleFacade: o,
        namedExportsMode: h,
        outro: l,
        varOrConst: c,
      },
      u
    ) {
      const d = u.compact ? "" : "\n",
        p = u.compact ? "" : " ";
      a =
        (!1 === u.strict ? a : `'use strict';${d}${d}${a}`) +
        (h && i && o && u.esModule ? `${u.compact ? ps : ds}${d}${d}` : "");
      let f = !1;
      const m = !1 !== u.interop;
      let g,
        x = !1;
      g = "";
      for (const {
        id: e,
        namedExportsMode: t,
        isChunk: n,
        name: i,
        reexports: r,
        imports: a,
        exportsNames: o,
        exportsDefault: h,
      } of s)
        r || a
          ? ((g += u.compact && x ? "," : `${g ? `;${d}` : ""}${c} `),
            (x = !0),
            m && !n && h && t
              ? ((f = !0),
                (g += o
                  ? `${i}${p}=${p}require('${e}')${
                      u.compact ? "," : `;\n${c} `
                    }${i}__default${p}=${p}${hs}(${i})`
                  : `${i}${p}=${p}${hs}(require('${e}'))`))
              : (g += `${i}${p}=${p}require('${e}')`))
          : (g && (g += !u.compact || x ? `;${d}` : ","),
            (x = !1),
            (g += `require('${e}')`));
      if ((g && (g += ";"), f)) {
        const e = u.compact ? "e" : "ex";
        a +=
          `function ${hs}${p}(${e})${p}{${p}return${p}` +
          `(${e}${p}&&${p}(typeof ${e}${p}===${p}'object')${p}&&${p}'default'${p}in ${e})${p}` +
          `?${p}${e}['default']${p}:${p}${e}${u.compact ? "" : "; "}}${d}${d}`;
      }
      t.has(ls) && (a += ys(p, d, r, !1 !== u.externalLiveBindings)),
        g && (a += g + d + d);
      const y = fs(n, s, h, u.interop, u.compact, r, `module.exports${p}=${p}`);
      return e.prepend(a), y && e.append(d + d + y), l && e.append(l), e;
    },
    es: function(e, { intro: t, outro: s, dependencies: n, exports: i }, r) {
      const a = r.compact ? "" : " ",
        o = r.compact ? "" : "\n",
        h = (function(e, t) {
          const s = [];
          for (const { id: n, reexports: i, imports: r, name: a } of e)
            if (i || r) {
              if (r) {
                let e = null,
                  i = null;
                const a = [];
                for (const t of r)
                  "default" === t.imported
                    ? (e = t)
                    : "*" === t.imported
                    ? (i = t)
                    : a.push(t);
                i && s.push(`import${t}*${t}as ${i.local} from${t}'${n}';`),
                  e && 0 === a.length
                    ? s.push(`import ${e.local} from${t}'${n}';`)
                    : a.length > 0 &&
                      s.push(
                        `import ${e ? `${e.local},${t}` : ""}{${t}${a
                          .map((e) =>
                            e.imported === e.local
                              ? e.imported
                              : `${e.imported} as ${e.local}`
                          )
                          .join(`,${t}`)}${t}}${t}from${t}'${n}';`
                      );
              }
              if (i) {
                let e = null;
                const o = [],
                  h = [];
                for (const t of i)
                  "*" === t.reexported
                    ? (e = t)
                    : "*" === t.imported
                    ? o.push(t)
                    : h.push(t);
                if (
                  (e && s.push(`export${t}*${t}from${t}'${n}';`), o.length > 0)
                ) {
                  (r && r.some((e) => "*" === e.imported && e.local === a)) ||
                    s.push(`import${t}*${t}as ${a} from${t}'${n}';`);
                  for (const e of o)
                    s.push(
                      `export${t}{${t}${
                        a === e.reexported ? a : `${a} as ${e.reexported}`
                      } };`
                    );
                }
                h.length > 0 &&
                  s.push(
                    `export${t}{${t}${h
                      .map((e) =>
                        e.imported === e.reexported
                          ? e.imported
                          : `${e.imported} as ${e.reexported}`
                      )
                      .join(`,${t}`)}${t}}${t}from${t}'${n}';`
                  );
              }
            } else s.push(`import${t}'${n}';`);
          return s;
        })(n, a);
      h.length > 0 && (t += h.join(o) + o + o), t && e.prepend(t);
      const l = (function(e, t) {
        const s = [],
          n = [];
        for (const t of e)
          "default" === t.exported
            ? s.push(`export default ${t.local};`)
            : n.push(
                t.exported === t.local ? t.local : `${t.local} as ${t.exported}`
              );
        n.length && s.push(`export${t}{${t}${n.join(`,${t}`)}${t}};`);
        return s;
      })(i, a);
      return (
        l.length && e.append(o + o + l.join(o).trim()),
        s && e.append(s),
        e.trim()
      );
    },
    iife: function(
      e,
      {
        dependencies: t,
        exports: s,
        hasExports: n,
        indentString: i,
        intro: r,
        namedExportsMode: a,
        outro: o,
        varOrConst: h,
        warn: l,
      },
      c
    ) {
      const u = c.compact ? "" : " ",
        d = c.compact ? "" : "\n",
        { extend: p, name: f } = c,
        m = f && -1 !== f.indexOf("."),
        g = !p && !m;
      var x;
      f &&
        g &&
        (dt((x = f)) || ct.has(x) || ut.test(x)) &&
        ws({
          code: "ILLEGAL_IDENTIFIER_AS_NAME",
          message: `Given name "${f}" is not a legal JS identifier. If you need this, you can try "output.extend: true".`,
        }),
        bs(l, t);
      const y = Vs(t),
        E = y.map((e) => e.globalName || "null"),
        b = y.map((e) => e.name);
      n &&
        !f &&
        l({
          message:
            'If you do not supply "output.name", you may not be able to access the exports of an IIFE bundle.',
        }),
        a &&
          n &&
          (p
            ? (E.unshift(`${Bs(f)}${u}=${u}${Bs(f)}${u}||${u}{}`),
              b.unshift("exports"))
            : (E.unshift("{}"), b.unshift("exports")));
      const v = !1 !== c.strict ? `${i}'use strict';${d}${d}` : "";
      let S = `(function${u}(${b.join(`,${u}`)})${u}{${d}${v}`;
      !n || (p && a) || !f || (S = (g ? `${h} ${f}` : Bs(f)) + `${u}=${u}${S}`),
        m &&
          n &&
          (S =
            (function(e, t, s, n) {
              const i = e.split(".");
              s &&
                (i[0] = ("function" == typeof s ? s(i[0]) : s[i[0]]) || i[0]);
              const r = n ? "" : " ";
              i.pop();
              let a = t;
              return (
                i
                  .map(
                    (e) => (
                      (a += Ms(e)),
                      `${a}${r}=${r}${a}${r}||${r}{}${n ? "" : ";"}`
                    )
                  )
                  .join(n ? "," : "\n") + (n && i.length ? ";" : "\n")
              );
            })(f, "this", c.globals, c.compact) + S);
      let A = `${d}${d}}(${E.join(`,${u}`)}));`;
      !p && a && n && (A = `${d}${d}${i}return exports;${A}`);
      const C = ms(t, c, h);
      C && e.prepend(C + d + d), r && e.prepend(r);
      const k = fs(s, t, a, c.interop, c.compact, i);
      return (
        k && e.append(d + d + k),
        o && e.append(o),
        e
          .indent(i)
          .prepend(S)
          .append(A)
      );
    },
    umd: function(
      e,
      {
        dependencies: t,
        exports: s,
        hasExports: n,
        indentString: i,
        intro: r,
        namedExportsMode: a,
        outro: o,
        varOrConst: h,
        warn: l,
      },
      c
    ) {
      const u = c.compact ? "" : " ",
        d = c.compact ? "" : "\n",
        p = c.compact ? "f" : "factory",
        f = c.compact ? "g" : "global";
      n &&
        !c.name &&
        ws({
          code: "INVALID_OPTION",
          message: 'You must supply "output.name" for UMD bundles.',
        }),
        bs(l, t);
      const m = t.map((e) => `'${e.id}'`),
        g = t.map((e) => `require('${e.id}')`),
        x = Vs(t),
        y = x.map((e) => Hs(e.globalName, f)),
        E = x.map((e) => e.name);
      a &&
        (n || !0 === c.noConflict) &&
        (m.unshift("'exports'"),
        g.unshift("exports"),
        y.unshift(
          Ds(
            c.name,
            f,
            c.globals,
            c.compact,
            `${c.extend ? `${Hs(c.name, f)}${u}||${u}` : ""}{}`
          )
        ),
        E.unshift("exports"));
      const b = c.amd || {},
        v =
          (b.id ? `'${b.id}',${u}` : "") +
          (m.length ? `[${m.join(`,${u}`)}],${u}` : ""),
        S = b.define || "define",
        A = !a && n ? `module.exports${u}=${u}` : "",
        C = !1 !== c.strict ? `${u}'use strict';${d}` : "";
      let k;
      if (!0 === c.noConflict) {
        const e = c.compact ? "e" : "exports";
        let t;
        if (!a && n)
          t = `var ${e}${u}=${u}${Ds(
            c.name,
            f,
            c.globals,
            c.compact,
            `${p}(${y.join(`,${u}`)})`
          )};`;
        else if (a) {
          t =
            `var ${e}${u}=${u}${y.shift()};${d}` +
            `${i}${i}${p}(${[e].concat(y).join(`,${u}`)});`;
        }
        k =
          `(function${u}()${u}{${d}` +
          `${i}${i}var current${u}=${u}${(function(e, t, s) {
            const n = e.split(".");
            let i = t;
            return n.map((e) => ((i += Ms(e)), i)).join(`${s}&&${s}`);
          })(c.name, f, u)};${d}` +
          `${i}${i}${t}${d}` +
          `${i}${i}${e}.noConflict${u}=${u}function${u}()${u}{${u}` +
          `${Hs(c.name, f)}${u}=${u}current;${u}return ${e}${
            c.compact ? "" : "; "
          }};${d}` +
          `${i}}())`;
      } else
        (k = `${p}(${y.join(`,${u}`)})`),
          !a && n && (k = Ds(c.name, f, c.globals, c.compact, k));
      const P = n || (!0 === c.noConflict && a) || y.length > 0,
        w = P ? `this,${u}` : "",
        I = P ? `(${f}${u}=${u}${f}${u}||${u}self,${u}` : "",
        N = P ? ")" : "",
        $ =
          `(function${u}(${P ? `${f},${u}` : ""}${p})${u}{${d}` +
          (P
            ? `${i}typeof exports${u}===${u}'object'${u}&&${u}typeof module${u}!==${u}'undefined'${u}?` +
              `${u}${A}${p}(${g.join(`,${u}`)})${u}:${d}`
            : "") +
          `${i}typeof ${S}${u}===${u}'function'${u}&&${u}${S}.amd${u}?${u}${S}(${v}${p})${u}:${d}` +
          `${i}${I}${k}${N};${d}` +
          `}(${w}(function${u}(${E.join(", ")})${u}{${C}${d}`,
        _ = d + d + "})));",
        L = ms(t, c, h);
      L && e.prepend(L + d + d), r && e.prepend(r);
      const T = fs(s, t, a, c.interop, c.compact, i);
      return (
        T && e.append(d + d + T),
        a && n && c.esModule && e.append(d + d + (c.compact ? ps : ds)),
        o && e.append(o),
        e
          .trim()
          .indent(i)
          .append(_)
          .prepend($)
      );
    },
  };
  const Ks = {
      ArrayPattern(e, t) {
        for (const s of t.elements) s && Ks[s.type](e, s);
      },
      AssignmentPattern(e, t) {
        Ks[t.left.type](e, t.left);
      },
      Identifier(e, t) {
        e.push(t.name);
      },
      MemberExpression() {},
      ObjectPattern(e, t) {
        for (const s of t.properties)
          "RestElement" === s.type
            ? Ks.RestElement(e, s)
            : Ks[s.value.type](e, s.value);
      },
      RestElement(e, t) {
        Ks[t.argument.type](e, t.argument);
      },
    },
    Ys = function(e) {
      const t = [];
      return Ks[e.type](t, e), t;
    };
  class Xs extends Tt {
    hasEffects() {
      return !1;
    }
    initialise() {
      this.context.addExport(this);
    }
    render(e, t, s) {
      e.remove(s.start, s.end);
    }
  }
  Xs.prototype.needsBoundaries = !0;
  class Qs extends Nt {
    addDeclaration(e, t, s = null, n) {
      return n
        ? this.parent.addDeclaration(e, t, "function" === n ? s : Re, n)
        : super.addDeclaration(e, t, s, !1);
    }
  }
  class Js extends Tt {
    addImplicitReturnExpressionToScope() {
      const e = this.body[this.body.length - 1];
      (e && e.type === xe) || this.scope.addReturnExpression(Re);
    }
    createScope(e) {
      this.scope = this.parent.preventChildBlockScope ? e : new Qs(e);
    }
    hasEffects(e) {
      for (const t of this.body) {
        if (t.hasEffects(e)) return !0;
        if (e.brokenFlow) break;
      }
      return !1;
    }
    include(e, t) {
      this.included = !0;
      for (const s of this.body)
        (t || s.shouldBeIncluded(e)) && s.include(e, t);
    }
    render(e, t) {
      this.body.length
        ? Ae(this.body, e, this.start + 1, this.end - 1, t)
        : super.render(e, t);
    }
  }
  class Zs extends Tt {
    createScope(e) {
      this.scope = new Bt(e, this.context);
    }
    deoptimizePath(e) {
      1 === e.length &&
        e[0] === X &&
        this.scope.getReturnExpression().deoptimizePath(J);
    }
    getReturnExpressionWhenCalledAtPath(e) {
      return 0 === e.length ? this.scope.getReturnExpression() : Re;
    }
    hasEffects() {
      return !1;
    }
    hasEffectsWhenAccessedAtPath(e) {
      return e.length > 1;
    }
    hasEffectsWhenAssignedAtPath(e) {
      return e.length > 1;
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      if (e.length > 0) return !0;
      for (const e of this.params) if (e.hasEffects(s)) return !0;
      const { ignore: n, brokenFlow: i } = s;
      return (
        (s.ignore = {
          breaks: !1,
          continues: !1,
          labels: new Set(),
          returnAwaitYield: !0,
        }),
        !!this.body.hasEffects(s) || ((s.ignore = n), (s.brokenFlow = i), !1)
      );
    }
    include(e, t) {
      this.included = !0;
      for (const s of this.params) s instanceof es || s.include(e, t);
      const { brokenFlow: s } = e;
      (e.brokenFlow = se), this.body.include(e, t), (e.brokenFlow = s);
    }
    includeCallArguments(e, t) {
      this.scope.includeCallArguments(e, t);
    }
    initialise() {
      this.scope.addParameterVariables(
        this.params.map((e) => e.declare("parameter", Re)),
        this.params[this.params.length - 1] instanceof ts
      ),
        this.body instanceof Js
          ? this.body.addImplicitReturnExpressionToScope()
          : this.scope.addReturnExpression(this.body);
    }
    parseNode(e) {
      e.body.type === oe &&
        (this.body = new this.context.nodeConstructors.BlockStatement(
          e.body,
          this,
          this.scope.hoistedBodyVarScope
        )),
        super.parseNode(e);
    }
  }
  function en(e) {
    return 1 === e.length
      ? `exports('${e[0].safeExportName ||
          e[0].exportName}', ${e[0].getName()});`
      : `exports({${e
          .map((e) => `${e.safeExportName || e.exportName}: ${e.getName()}`)
          .join(", ")}});`;
  }
  Zs.prototype.preventChildBlockScope = !0;
  class tn extends Tt {
    initialise() {
      this.directive &&
        "use strict" !== this.directive &&
        this.parent.type === me &&
        this.context.warn(
          {
            code: "MODULE_LEVEL_DIRECTIVE",
            message: `Module level directives cause errors when bundled, '${this.directive}' was ignored.`,
          },
          this.start
        );
    }
    render(e, t) {
      super.render(e, t), this.included && this.insertSemicolon(e);
    }
    shouldBeIncluded(e) {
      return this.directive && "use strict" !== this.directive
        ? this.parent.type !== me
        : super.shouldBeIncluded(e);
    }
  }
  const sn = {
    "!=": (e, t) => e != t,
    "!==": (e, t) => e !== t,
    "%": (e, t) => e % t,
    "&": (e, t) => e & t,
    "*": (e, t) => e * t,
    "**": (e, t) => Math.pow(e, t),
    "+": (e, t) => e + t,
    "-": (e, t) => e - t,
    "/": (e, t) => e / t,
    "<": (e, t) => e < t,
    "<<": (e, t) => e << t,
    "<=": (e, t) => e <= t,
    "==": (e, t) => e == t,
    "===": (e, t) => e === t,
    ">": (e, t) => e > t,
    ">=": (e, t) => e >= t,
    ">>": (e, t) => e >> t,
    ">>>": (e, t) => e >>> t,
    "^": (e, t) => e ^ t,
    in: () => Te,
    instanceof: () => Te,
    "|": (e, t) => e | t,
  };
  class nn extends Vt {
    addDeclaration(e, t, s, n) {
      return n
        ? this.parent.addDeclaration(e, t, s, n)
        : super.addDeclaration(e, t, s, !1);
    }
  }
  class rn extends Tt {
    createScope(e) {
      this.scope = new nn(e, this.context);
    }
    initialise() {
      this.param && this.param.declare("parameter", Re);
    }
    parseNode(e) {
      (this.body = new this.context.nodeConstructors.BlockStatement(
        e.body,
        this,
        this.scope
      )),
        super.parseNode(e);
    }
  }
  rn.prototype.preventChildBlockScope = !0;
  class an {
    constructor(e) {
      (this.included = !1), (this.expressions = e);
    }
    deoptimizePath(e) {
      for (const t of this.expressions) t.deoptimizePath(e);
    }
    getLiteralValueAtPath() {
      return Te;
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      return new an(
        this.expressions.map((n) =>
          n.getReturnExpressionWhenCalledAtPath(e, t, s)
        )
      );
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      for (const s of this.expressions)
        if (s.hasEffectsWhenAccessedAtPath(e, t)) return !0;
      return !1;
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      for (const s of this.expressions)
        if (s.hasEffectsWhenAssignedAtPath(e, t)) return !0;
      return !1;
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      for (const n of this.expressions)
        if (n.hasEffectsWhenCalledAtPath(e, t, s)) return !0;
      return !1;
    }
    include() {}
    includeCallArguments() {}
  }
  class on extends Tt {
    bind() {
      null !== this.declaration && this.declaration.bind();
    }
    hasEffects(e) {
      return null !== this.declaration && this.declaration.hasEffects(e);
    }
    initialise() {
      this.context.addExport(this);
    }
    render(e, t, s) {
      const { start: n, end: i } = s;
      null === this.declaration
        ? e.remove(n, i)
        : (e.remove(this.start, this.declaration.start),
          this.declaration.render(e, t, { start: n, end: i }));
    }
  }
  on.prototype.needsBoundaries = !0;
  class hn extends Tt {
    bind() {}
    hasEffects() {
      return !1;
    }
    initialise() {
      this.context.addImport(this);
    }
    render(e, t, s) {
      e.remove(s.start, s.end);
    }
  }
  hn.prototype.needsBoundaries = !0;
  class ln extends Tt {
    getLiteralValueAtPath(e) {
      return e.length > 0 ||
        (null === this.value &&
          110 !== this.context.code.charCodeAt(this.start)) ||
        "bigint" == typeof this.value ||
        47 === this.context.code.charCodeAt(this.start)
        ? Te
        : this.value;
    }
    getReturnExpressionWhenCalledAtPath(e) {
      return 1 !== e.length ? Re : rt(this.members, e[0]);
    }
    hasEffectsWhenAccessedAtPath(e) {
      return null === this.value ? e.length > 0 : e.length > 1;
    }
    hasEffectsWhenAssignedAtPath(e) {
      return e.length > 0;
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return 1 !== e.length || it(this.members, e[0], this.included, t, s);
    }
    initialise() {
      this.members = (function(e) {
        switch (typeof e) {
          case "boolean":
            return tt;
          case "number":
            return st;
          case "string":
            return nt;
          default:
            return Object.create(null);
        }
      })(this.value);
    }
    render(e) {
      "string" == typeof this.value &&
        e.indentExclusionRanges.push([this.start + 1, this.end - 1]);
    }
  }
  function cn(e) {
    return e.computed
      ? (function(e) {
          if (e instanceof ln) return String(e.value);
          return null;
        })(e.property)
      : e.property.name;
  }
  class un extends Tt {
    constructor() {
      super(...arguments),
        (this.variable = null),
        (this.bound = !1),
        (this.expressionsToBeDeoptimized = []),
        (this.replacement = null);
    }
    addExportedVariables() {}
    bind() {
      if (this.bound) return;
      this.bound = !0;
      const e = (function e(t) {
          const s = t.propertyKey,
            n = t.object;
          if ("string" == typeof s) {
            if (n instanceof es)
              return [
                { key: n.name, pos: n.start },
                { key: s, pos: t.property.start },
              ];
            if (n instanceof un) {
              const i = e(n);
              return i && [...i, { key: s, pos: t.property.start }];
            }
          }
          return null;
        })(this),
        t = e && this.scope.findVariable(e[0].key);
      if (t && t.isNamespace) {
        const s = this.resolveNamespaceVariables(t, e.slice(1));
        s
          ? "string" == typeof s
            ? (this.replacement = s)
            : (s instanceof ot && s.module && s.module.suggestName(e[0].key),
              (this.variable = s),
              this.scope.addNamespaceMemberAccess(
                (function(e) {
                  let t = e[0].key;
                  for (let s = 1; s < e.length; s++) t += "." + e[s].key;
                  return t;
                })(e),
                s
              ))
          : super.bind();
      } else
        super.bind(), null === this.propertyKey && this.analysePropertyKey();
    }
    deoptimizeCache() {
      for (const e of this.expressionsToBeDeoptimized) e.deoptimizeCache();
    }
    deoptimizePath(e) {
      this.bound || this.bind(),
        0 === e.length && this.disallowNamespaceReassignment(),
        this.variable
          ? this.variable.deoptimizePath(e)
          : (null === this.propertyKey && this.analysePropertyKey(),
            this.object.deoptimizePath([this.propertyKey, ...e]));
    }
    getLiteralValueAtPath(e, t, s) {
      return (
        this.bound || this.bind(),
        null !== this.variable
          ? this.variable.getLiteralValueAtPath(e, t, s)
          : (null === this.propertyKey && this.analysePropertyKey(),
            this.expressionsToBeDeoptimized.push(s),
            this.object.getLiteralValueAtPath([this.propertyKey, ...e], t, s))
      );
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      return (
        this.bound || this.bind(),
        null !== this.variable
          ? this.variable.getReturnExpressionWhenCalledAtPath(e, t, s)
          : (null === this.propertyKey && this.analysePropertyKey(),
            this.expressionsToBeDeoptimized.push(s),
            this.object.getReturnExpressionWhenCalledAtPath(
              [this.propertyKey, ...e],
              t,
              s
            ))
      );
    }
    hasEffects(e) {
      return (
        this.property.hasEffects(e) ||
        this.object.hasEffects(e) ||
        (this.context.propertyReadSideEffects &&
          this.object.hasEffectsWhenAccessedAtPath([this.propertyKey], e))
      );
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      return (
        0 !== e.length &&
        (null !== this.variable
          ? this.variable.hasEffectsWhenAccessedAtPath(e, t)
          : this.object.hasEffectsWhenAccessedAtPath(
              [this.propertyKey, ...e],
              t
            ))
      );
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return null !== this.variable
        ? this.variable.hasEffectsWhenAssignedAtPath(e, t)
        : this.object.hasEffectsWhenAssignedAtPath([this.propertyKey, ...e], t);
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return null !== this.variable
        ? this.variable.hasEffectsWhenCalledAtPath(e, t, s)
        : this.object.hasEffectsWhenCalledAtPath(
            [this.propertyKey, ...e],
            t,
            s
          );
    }
    include(e, t) {
      this.included ||
        ((this.included = !0),
        null !== this.variable &&
          this.context.includeVariable(e, this.variable)),
        this.object.include(e, t),
        this.property.include(e, t);
    }
    includeCallArguments(e, t) {
      this.variable
        ? this.variable.includeCallArguments(e, t)
        : super.includeCallArguments(e, t);
    }
    initialise() {
      this.propertyKey = cn(this);
    }
    render(e, t, { renderedParentType: s, isCalleeOfRenderedParent: n } = Wt) {
      const i = s === he && n;
      if (this.variable || this.replacement) {
        let t = this.variable ? this.variable.getName() : this.replacement;
        i && (t = "0, " + t),
          e.overwrite(this.start, this.end, t, {
            contentOnly: !0,
            storeName: !0,
          });
      } else i && e.appendRight(this.start, "0, "), super.render(e, t);
    }
    analysePropertyKey() {
      this.propertyKey = X;
      const e = this.property.getLiteralValueAtPath(Q, te, this);
      this.propertyKey = e === Te ? X : String(e);
    }
    disallowNamespaceReassignment() {
      this.object instanceof es &&
        this.scope.findVariable(this.object.name).isNamespace &&
        this.context.error(
          {
            code: "ILLEGAL_NAMESPACE_REASSIGNMENT",
            message: `Illegal reassignment to import '${this.object.name}'`,
          },
          this.start
        );
    }
    resolveNamespaceVariables(e, t) {
      if (0 === t.length) return e;
      if (!e.isNamespace) return null;
      const s = t[0].key,
        n =
          e instanceof ot
            ? e.module.getVariableForExportName(s)
            : e.context.traceExport(s);
      if (!n) {
        const n = e instanceof ot ? e.module.id : e.context.fileName;
        return (
          this.context.warn(
            {
              code: "MISSING_EXPORT",
              exporter: ks(n),
              importer: ks(this.context.fileName),
              message: `'${s}' is not exported by '${ks(n)}'`,
              missing: s,
              url:
                "https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module",
            },
            t[0].pos
          ),
          "undefined"
        );
      }
      return this.resolveNamespaceVariables(n, t.slice(1));
    }
  }
  const dn = (e) => (...t) => {
      throw new Error(`Cannot use fs.${e} inside browser`);
    },
    pn = dn("lstatSync"),
    fn = dn("readdirSync"),
    mn = dn("readFile"),
    gn = dn("realpathSync"),
    xn = dn("writeFile");
  function yn(e) {
    return {
      name: "Rollup Core",
      resolveId: bn(e),
      load: (e) => mn(e),
      resolveFileUrl: ({ relativePath: e, format: t }) => Pn[t](e),
      resolveImportMeta(e, { chunkId: t, format: s }) {
        const n = Cn[s] && Cn[s](e, t);
        if (n) return n;
      },
    };
  }
  function En(e, t) {
    try {
      const s = pn(e);
      if (!t && s.isSymbolicLink()) return En(gn(e), t);
      if ((t && s.isSymbolicLink()) || s.isFile()) {
        const t = Et(e);
        if (-1 !== fn(bt(e)).indexOf(t)) return e;
      }
    } catch (e) {}
  }
  function bn(e) {
    return function(t, s) {
      return (
        "undefined" == typeof process &&
          ws({
            code: "MISSING_PROCESS",
            message:
              "It looks like you're using Rollup in a non-Node.js environment. This means you must supply a plugin with custom resolveId and load functions",
            url: "https://rollupjs.org/guide/en/#a-simple-example",
          }),
        void 0 === s || gt(t) || "." === t[0]
          ? (function(e, t) {
              let s = En(e, t);
              return (
                s || ((s = En(e + ".mjs", t)) ? s : (s = En(e + ".js", t)))
              );
            })(At(s ? bt(s) : At(), t), e)
          : null
      );
    };
  }
  const vn = (e, t = "URL") => `new ${t}(${e}).href`,
    Sn = (e) =>
      `(document.currentScript && document.currentScript.src || new URL('${e}', document.baseURI).href)`,
    An = (e) => (t, s) => {
      const n = e(s);
      return null === t ? `({ url: ${n} })` : "url" === t ? n : "undefined";
    },
    Cn = {
      amd: An(() => vn("module.uri, document.baseURI")),
      cjs: An(
        (e) =>
          `(typeof document === 'undefined' ? ${vn(
            "'file:' + __filename",
            "(require('u' + 'rl').URL)"
          )} : ${Sn(e)})`
      ),
      iife: An((e) => Sn(e)),
      system: (e) => (null === e ? "module.meta" : `module.meta.${e}`),
      umd: An(
        (e) =>
          `(typeof document === 'undefined' ? ${vn(
            "'file:' + __filename",
            "(require('u' + 'rl').URL)"
          )} : ${Sn(e)})`
      ),
    },
    kn = (e) =>
      vn(
        `'${e}', document.currentScript && document.currentScript.src || document.baseURI`
      ),
    Pn = {
      amd: (e) => (
        "." !== e[0] && (e = "./" + e),
        vn(`require.toUrl('${e}'), document.baseURI`)
      ),
      cjs: (e) =>
        `(typeof document === 'undefined' ? ${vn(
          `'file:' + __dirname + '/${e}'`,
          "(require('u' + 'rl').URL)"
        )} : ${kn(e)})`,
      es: (e) => vn(`'${e}', import.meta.url`),
      iife: (e) => kn(e),
      system: (e) => vn(`'${e}', module.meta.url`),
      umd: (e) =>
        `(typeof document === 'undefined' ? ${vn(
          `'file:' + __dirname + '/${e}'`,
          "(require('u' + 'rl').URL)"
        )} : ${kn(e)})`,
    },
    wn = {
      amd: ["document", "module", "URL"],
      cjs: ["document", "require", "URL"],
      iife: ["document", "URL"],
      system: ["module"],
      umd: ["document", "require", "URL"],
    },
    In = {
      amd: ["document", "require", "URL"],
      cjs: ["document", "require", "URL"],
      iife: ["document", "URL"],
      system: ["module", "URL"],
      umd: ["document", "require", "URL"],
    },
    Nn = "ROLLUP_ASSET_URL_",
    $n = "ROLLUP_CHUNK_URL_",
    _n = "ROLLUP_FILE_URL_";
  class Ln extends Tt {
    bind() {
      super.bind(), this.argument.deoptimizePath([X, X]);
    }
  }
  class Tn extends Tt {
    hasEffects(e) {
      for (const t of this.body) if (t.hasEffects(e)) return !0;
      return !1;
    }
    include(e, t) {
      this.included = !0;
      for (const s of this.body)
        (t || s.shouldBeIncluded(e)) && s.include(e, t);
    }
    render(e, t) {
      this.body.length
        ? Ae(this.body, e, this.start, this.end, t)
        : super.render(e, t);
    }
  }
  class Rn extends Tt {
    hasEffects(e) {
      if (this.test && this.test.hasEffects(e)) return !0;
      for (const t of this.consequent) {
        if (e.brokenFlow) break;
        if (t.hasEffects(e)) return !0;
      }
      return !1;
    }
    include(e, t) {
      (this.included = !0), this.test && this.test.include(e, t);
      for (const s of this.consequent)
        (t || s.shouldBeIncluded(e)) && s.include(e, t);
    }
    render(e, t, s) {
      if (this.consequent.length) {
        this.test && this.test.render(e, t);
        const n = this.test
            ? this.test.end
            : ve(e.original, "default", this.start) + 7,
          i = ve(e.original, ":", n) + 1;
        Ae(this.consequent, e, i, s.end, t);
      } else super.render(e, t);
    }
  }
  Rn.prototype.needsBoundaries = !0;
  class Mn extends Tt {
    getLiteralValueAtPath(e) {
      return e.length > 0 || 1 !== this.quasis.length
        ? Te
        : this.quasis[0].value.cooked;
    }
    render(e, t) {
      e.indentExclusionRanges.push([this.start, this.end]), super.render(e, t);
    }
  }
  class On extends Nt {
    constructor(e, t) {
      super(e),
        (this.context = t),
        this.variables.set("this", new wt("this", null, Me, t));
    }
    addExportDefaultDeclaration(e, t, s) {
      const n = new as(e, t, s);
      return this.variables.set("default", n), n;
    }
    addNamespaceMemberAccess(e, t) {
      t instanceof Zt && this.accessedOutsideVariables.set(t.name, t);
    }
    deconflict(e) {
      for (const t of this.children) t.deconflict(e);
    }
    findLexicalBoundary() {
      return this;
    }
    findVariable(e) {
      const t = this.variables.get(e) || this.accessedOutsideVariables.get(e);
      if (t) return t;
      const s = this.context.traceVariable(e) || this.parent.findVariable(e);
      return s instanceof Zt && this.accessedOutsideVariables.set(e, s), s;
    }
  }
  const Dn = {
    "!": (e) => !e,
    "+": (e) => +e,
    "-": (e) => -e,
    delete: () => Te,
    typeof: (e) => typeof e,
    void: () => void 0,
    "~": (e) => ~e,
  };
  function Vn(e) {
    return null !== e.renderBaseName && null !== e.exportName && e.isReassigned;
  }
  class Bn extends Tt {
    deoptimizePath() {
      for (const e of this.declarations) e.deoptimizePath(Q);
    }
    hasEffectsWhenAssignedAtPath() {
      return !1;
    }
    include(e, t) {
      this.included = !0;
      for (const s of this.declarations)
        (t || s.shouldBeIncluded(e)) && s.include(e, t);
    }
    includeWithAllDeclaredVariables(e, t) {
      this.included = !0;
      for (const s of this.declarations) s.include(t, e);
    }
    initialise() {
      for (const e of this.declarations) e.declareDeclarator(this.kind);
    }
    render(e, t, s = Wt) {
      if (
        (function(e) {
          for (const t of e) {
            if (!t.included) return !1;
            if (t.id.type === de) {
              if (t.id.variable.exportName) return !1;
            } else {
              const e = [];
              if ((t.id.addExportedVariables(e), e.length > 0)) return !1;
            }
          }
          return !0;
        })(this.declarations)
      ) {
        for (const s of this.declarations) s.render(e, t);
        s.isNoStatement ||
          59 === e.original.charCodeAt(this.end - 1) ||
          e.appendLeft(this.end, ";");
      } else this.renderReplacedDeclarations(e, t, s);
    }
    renderDeclarationEnd(e, t, s, n, i, r, a) {
      59 === e.original.charCodeAt(this.end - 1) &&
        e.remove(this.end - 1, this.end),
        r && (t += ";"),
        null !== s
          ? (10 !== e.original.charCodeAt(n - 1) ||
              (10 !== e.original.charCodeAt(this.end) &&
                13 !== e.original.charCodeAt(this.end)) ||
              (n--, 13 === e.original.charCodeAt(n) && n--),
            n === s + 1
              ? e.overwrite(s, i, t)
              : (e.overwrite(s, s + 1, t), e.remove(n, i)))
          : e.appendLeft(i, t),
        a.length > 0 && e.appendLeft(i, " " + en(a));
    }
    renderReplacedDeclarations(
      e,
      t,
      { start: s = this.start, end: n = this.end, isNoStatement: i }
    ) {
      const r = Ce(
        this.declarations,
        e,
        this.start + this.kind.length,
        this.end - (59 === e.original.charCodeAt(this.end - 1) ? 1 : 0)
      );
      let a,
        o,
        h =
          (o = /\n\s*$/.test(e.slice(this.start, r[0].start))
            ? this.start + this.kind.length
            : r[0].start) - 1;
      e.remove(this.start, h);
      let l,
        c,
        u = !1,
        d = !1,
        p = "";
      const f = [];
      for (const {
        node: s,
        start: n,
        separator: i,
        contentEnd: m,
        end: g,
      } of r)
        !s.included ||
        (s.id instanceof es && Vn(s.id.variable) && null === s.init)
          ? e.remove(n, g)
          : ((l = ""),
            (c = ""),
            s.id instanceof es && Vn(s.id.variable)
              ? (d && (p += ";"), (u = !1))
              : ("system" === t.format &&
                  null !== s.init &&
                  (s.id.type !== de
                    ? s.id.addExportedVariables(f)
                    : s.id.variable.exportName &&
                      (e.prependLeft(
                        e.original.indexOf("=", s.id.end) + 1,
                        ` exports('${s.id.variable.safeExportName ||
                          s.id.variable.exportName}',`
                      ),
                      (c += ")"))),
                u
                  ? (p += ",")
                  : (d && (p += ";"), (l += `${this.kind} `), (u = !0))),
            o === h + 1
              ? e.overwrite(h, o, p + l)
              : (e.overwrite(h, h + 1, p), e.appendLeft(o, l)),
            s.render(e, t),
            (a = m),
            (o = g),
            (d = !0),
            (h = i),
            (p = c));
      d ? this.renderDeclarationEnd(e, p, h, a, o, !i, f) : e.remove(s, n);
    }
  }
  const Fn = {
    ArrayExpression: class extends Tt {
      bind() {
        super.bind();
        for (const e of this.elements) null !== e && e.deoptimizePath(J);
      }
      getReturnExpressionWhenCalledAtPath(e) {
        return 1 !== e.length ? Re : rt(et, e[0]);
      }
      hasEffectsWhenAccessedAtPath(e) {
        return e.length > 1;
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        return 1 !== e.length || it(et, e[0], this.included, t, s);
      }
    },
    ArrayPattern: class extends Tt {
      addExportedVariables(e) {
        for (const t of this.elements) null !== t && t.addExportedVariables(e);
      }
      declare(e) {
        const t = [];
        for (const s of this.elements)
          null !== s && t.push(...s.declare(e, Re));
        return t;
      }
      deoptimizePath(e) {
        if (0 === e.length)
          for (const t of this.elements) null !== t && t.deoptimizePath(e);
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        if (e.length > 0) return !0;
        for (const e of this.elements)
          if (null !== e && e.hasEffectsWhenAssignedAtPath(Q, t)) return !0;
        return !1;
      }
    },
    ArrowFunctionExpression: Zs,
    AssignmentExpression: class extends Tt {
      bind() {
        super.bind(), this.left.deoptimizePath(Q), this.right.deoptimizePath(J);
      }
      hasEffects(e) {
        return (
          this.right.hasEffects(e) ||
          this.left.hasEffects(e) ||
          this.left.hasEffectsWhenAssignedAtPath(Q, e)
        );
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        return e.length > 0 && this.right.hasEffectsWhenAccessedAtPath(e, t);
      }
      render(e, t) {
        if (
          (this.left.render(e, t),
          this.right.render(e, t),
          "system" === t.format)
        )
          if (this.left.variable && this.left.variable.exportName)
            e.prependLeft(
              e.original.indexOf("=", this.left.end) + 1,
              ` exports('${this.left.variable.exportName}',`
            ),
              e.appendLeft(this.right.end, ")");
          else if ("addExportedVariables" in this.left) {
            const t = [];
            this.left.addExportedVariables(t),
              t.length > 0 &&
                (e.prependRight(
                  this.start,
                  `function (v) {${en(t)} return v;} (`
                ),
                e.appendLeft(this.end, ")"));
          }
      }
    },
    AssignmentPattern: class extends Tt {
      addExportedVariables(e) {
        this.left.addExportedVariables(e);
      }
      bind() {
        super.bind(), this.left.deoptimizePath(Q), this.right.deoptimizePath(J);
      }
      declare(e, t) {
        return this.left.declare(e, t);
      }
      deoptimizePath(e) {
        0 === e.length && this.left.deoptimizePath(e);
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        return e.length > 0 || this.left.hasEffectsWhenAssignedAtPath(Q, t);
      }
      render(e, t, { isShorthandProperty: s } = Wt) {
        this.left.render(e, t, { isShorthandProperty: s }),
          this.right.render(e, t);
      }
    },
    AwaitExpression: class extends Tt {
      hasEffects(e) {
        return !e.ignore.returnAwaitYield || this.argument.hasEffects(e);
      }
      include(e, t) {
        if (!this.included) {
          this.included = !0;
          e: if (!this.context.usesTopLevelAwait) {
            let e = this.parent;
            do {
              if (e instanceof ss || e instanceof Zs) break e;
            } while ((e = e.parent));
            this.context.usesTopLevelAwait = !0;
          }
        }
        this.argument.include(e, t);
      }
    },
    BinaryExpression: class extends Tt {
      deoptimizeCache() {}
      getLiteralValueAtPath(e, t, s) {
        if (e.length > 0) return Te;
        const n = this.left.getLiteralValueAtPath(Q, t, s);
        if (n === Te) return Te;
        const i = this.right.getLiteralValueAtPath(Q, t, s);
        if (i === Te) return Te;
        const r = sn[this.operator];
        return r ? r(n, i) : Te;
      }
      hasEffects(e) {
        return (
          ("+" === this.operator &&
            this.parent instanceof tn &&
            "" === this.left.getLiteralValueAtPath(Q, te, this)) ||
          super.hasEffects(e)
        );
      }
      hasEffectsWhenAccessedAtPath(e) {
        return e.length > 1;
      }
    },
    BlockStatement: Js,
    BreakStatement: class extends Tt {
      hasEffects(e) {
        if (this.label) {
          if (!e.ignore.labels.has(this.label.name)) return !0;
          e.includedLabels.add(this.label.name), (e.brokenFlow = ie);
        } else {
          if (!e.ignore.breaks) return !0;
          e.brokenFlow = ne;
        }
        return !1;
      }
      include(e) {
        (this.included = !0),
          this.label &&
            (this.label.include(e), e.includedLabels.add(this.label.name)),
          (e.brokenFlow = this.label ? ie : ne);
      }
    },
    CallExpression: class extends Tt {
      constructor() {
        super(...arguments),
          (this.expressionsToBeDeoptimized = []),
          (this.returnExpression = null);
      }
      bind() {
        if ((super.bind(), this.callee instanceof es)) {
          this.scope.findVariable(this.callee.name).isNamespace &&
            this.context.error(
              {
                code: "CANNOT_CALL_NAMESPACE",
                message: `Cannot call a namespace ('${this.callee.name}')`,
              },
              this.start
            ),
            "eval" === this.callee.name &&
              this.context.warn(
                {
                  code: "EVAL",
                  message:
                    "Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification",
                  url: "https://rollupjs.org/guide/en/#avoiding-eval",
                },
                this.start
              );
        }
        null === this.returnExpression &&
          (this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(
            Q,
            te,
            this
          ));
        for (const e of this.arguments) e.deoptimizePath(J);
      }
      deoptimizeCache() {
        if (this.returnExpression !== Re) {
          this.returnExpression = Re;
          for (const e of this.expressionsToBeDeoptimized) e.deoptimizeCache();
        }
      }
      deoptimizePath(e) {
        if (0 === e.length) return;
        const t = this.context.deoptimizationTracker.getEntities(e);
        t.has(this) ||
          (t.add(this),
          null === this.returnExpression &&
            (this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(
              Q,
              te,
              this
            )),
          this.returnExpression.deoptimizePath(e));
      }
      getLiteralValueAtPath(e, t, s) {
        if (
          (null === this.returnExpression &&
            (this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(
              Q,
              t,
              this
            )),
          this.returnExpression === Re)
        )
          return Te;
        const n = t.getEntities(e);
        if (n.has(this.returnExpression)) return Te;
        this.expressionsToBeDeoptimized.push(s), n.add(this.returnExpression);
        const i = this.returnExpression.getLiteralValueAtPath(e, t, s);
        return n.delete(this.returnExpression), i;
      }
      getReturnExpressionWhenCalledAtPath(e, t, s) {
        if (
          (null === this.returnExpression &&
            (this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(
              Q,
              t,
              this
            )),
          this.returnExpression === Re)
        )
          return Re;
        const n = t.getEntities(e);
        if (n.has(this.returnExpression)) return Re;
        this.expressionsToBeDeoptimized.push(s), n.add(this.returnExpression);
        const i = this.returnExpression.getReturnExpressionWhenCalledAtPath(
          e,
          t,
          s
        );
        return n.delete(this.returnExpression), i;
      }
      hasEffects(e) {
        for (const t of this.arguments) if (t.hasEffects(e)) return !0;
        return (
          (!this.context.annotations || !this.annotatedPure) &&
          (this.callee.hasEffects(e) ||
            this.callee.hasEffectsWhenCalledAtPath(Q, this.callOptions, e))
        );
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        if (0 === e.length) return !1;
        const s = t.accessed.getEntities(e);
        return (
          !s.has(this) &&
          (s.add(this),
          this.returnExpression.hasEffectsWhenAccessedAtPath(e, t))
        );
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        if (0 === e.length) return !0;
        const s = t.assigned.getEntities(e);
        return (
          !s.has(this) &&
          (s.add(this),
          this.returnExpression.hasEffectsWhenAssignedAtPath(e, t))
        );
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        const n = (t.withNew ? s.instantiated : s.called).getEntities(e);
        return (
          !n.has(this) &&
          (n.add(this),
          this.returnExpression.hasEffectsWhenCalledAtPath(e, t, s))
        );
      }
      include(e, t) {
        t
          ? (super.include(e, t),
            t === Lt &&
              this.callee instanceof es &&
              this.callee.variable &&
              this.callee.variable.markCalledFromTryStatement())
          : ((this.included = !0), this.callee.include(e, !1)),
          this.callee.includeCallArguments(e, this.arguments),
          this.returnExpression.included ||
            this.returnExpression.include(e, !1);
      }
      initialise() {
        this.callOptions = { args: this.arguments, withNew: !1 };
      }
      render(e, t, { renderedParentType: s } = Wt) {
        if ((this.callee.render(e, t), this.arguments.length > 0))
          if (this.arguments[this.arguments.length - 1].included)
            for (const s of this.arguments) s.render(e, t);
          else {
            let s = this.arguments.length - 2;
            for (; s >= 0 && !this.arguments[s].included; ) s--;
            if (s >= 0) {
              for (let n = 0; n <= s; n++) this.arguments[n].render(e, t);
              e.remove(
                ve(e.original, ",", this.arguments[s].end),
                this.end - 1
              );
            } else
              e.remove(ve(e.original, "(", this.callee.end) + 1, this.end - 1);
          }
        s === ce &&
          this.callee.type === ue &&
          (e.appendRight(this.start, "("), e.prependLeft(this.end, ")"));
      }
    },
    CatchClause: rn,
    ClassBody: class extends Tt {
      hasEffectsWhenCalledAtPath(e, t, s) {
        return (
          e.length > 0 ||
          (null !== this.classConstructor &&
            this.classConstructor.hasEffectsWhenCalledAtPath(Q, t, s))
        );
      }
      initialise() {
        for (const e of this.body)
          if ("constructor" === e.kind) return void (this.classConstructor = e);
        this.classConstructor = null;
      }
    },
    ClassDeclaration: Mt,
    ClassExpression: class extends Rt {},
    ConditionalExpression: class extends Tt {
      constructor() {
        super(...arguments),
          (this.expressionsToBeDeoptimized = []),
          (this.isBranchResolutionAnalysed = !1),
          (this.unusedBranch = null),
          (this.usedBranch = null);
      }
      bind() {
        super.bind(),
          this.isBranchResolutionAnalysed || this.analyseBranchResolution();
      }
      deoptimizeCache() {
        if (null !== this.usedBranch) {
          (this.usedBranch = null), this.unusedBranch.deoptimizePath(J);
          for (const e of this.expressionsToBeDeoptimized) e.deoptimizeCache();
        }
      }
      deoptimizePath(e) {
        e.length > 0 &&
          (this.isBranchResolutionAnalysed || this.analyseBranchResolution(),
          null === this.usedBranch
            ? (this.consequent.deoptimizePath(e),
              this.alternate.deoptimizePath(e))
            : this.usedBranch.deoptimizePath(e));
      }
      getLiteralValueAtPath(e, t, s) {
        return (
          this.isBranchResolutionAnalysed || this.analyseBranchResolution(),
          null === this.usedBranch
            ? Te
            : (this.expressionsToBeDeoptimized.push(s),
              this.usedBranch.getLiteralValueAtPath(e, t, s))
        );
      }
      getReturnExpressionWhenCalledAtPath(e, t, s) {
        return (
          this.isBranchResolutionAnalysed || this.analyseBranchResolution(),
          null === this.usedBranch
            ? new an([
                this.consequent.getReturnExpressionWhenCalledAtPath(e, t, s),
                this.alternate.getReturnExpressionWhenCalledAtPath(e, t, s),
              ])
            : (this.expressionsToBeDeoptimized.push(s),
              this.usedBranch.getReturnExpressionWhenCalledAtPath(e, t, s))
        );
      }
      hasEffects(e) {
        return (
          !!this.test.hasEffects(e) ||
          (null === this.usedBranch
            ? this.consequent.hasEffects(e) || this.alternate.hasEffects(e)
            : this.usedBranch.hasEffects(e))
        );
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        return (
          0 !== e.length &&
          (null === this.usedBranch
            ? this.consequent.hasEffectsWhenAccessedAtPath(e, t) ||
              this.alternate.hasEffectsWhenAccessedAtPath(e, t)
            : this.usedBranch.hasEffectsWhenAccessedAtPath(e, t))
        );
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        return (
          0 === e.length ||
          (null === this.usedBranch
            ? this.consequent.hasEffectsWhenAssignedAtPath(e, t) ||
              this.alternate.hasEffectsWhenAssignedAtPath(e, t)
            : this.usedBranch.hasEffectsWhenAssignedAtPath(e, t))
        );
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        return null === this.usedBranch
          ? this.consequent.hasEffectsWhenCalledAtPath(e, t, s) ||
              this.alternate.hasEffectsWhenCalledAtPath(e, t, s)
          : this.usedBranch.hasEffectsWhenCalledAtPath(e, t, s);
      }
      include(e, t) {
        (this.included = !0),
          t || null === this.usedBranch || this.test.shouldBeIncluded(e)
            ? (this.test.include(e, t),
              this.consequent.include(e, t),
              this.alternate.include(e, t))
            : this.usedBranch.include(e, t);
      }
      render(
        e,
        t,
        {
          renderedParentType: s,
          isCalleeOfRenderedParent: n,
          preventASI: i,
        } = Wt
      ) {
        if (this.test.included) super.render(e, t);
        else {
          const r = ve(e.original, ":", this.consequent.end),
            a =
              (this.consequent.included
                ? ve(e.original, "?", this.test.end)
                : r) + 1;
          i && ke(e, a, this.usedBranch.start),
            e.remove(this.start, a),
            this.consequent.included && e.remove(r, this.end),
            Ee(this, e),
            this.usedBranch.render(e, t, {
              isCalleeOfRenderedParent: s ? n : this.parent.callee === this,
              renderedParentType: s || this.parent.type,
            });
        }
      }
      analyseBranchResolution() {
        this.isBranchResolutionAnalysed = !0;
        const e = this.test.getLiteralValueAtPath(Q, te, this);
        e !== Te &&
          (e
            ? ((this.usedBranch = this.consequent),
              (this.unusedBranch = this.alternate))
            : ((this.usedBranch = this.alternate),
              (this.unusedBranch = this.consequent)));
      }
    },
    ContinueStatement: class extends Tt {
      hasEffects(e) {
        if (this.label) {
          if (!e.ignore.labels.has(this.label.name)) return !0;
          e.includedLabels.add(this.label.name), (e.brokenFlow = ie);
        } else {
          if (!e.ignore.continues) return !0;
          e.brokenFlow = ne;
        }
        return !1;
      }
      include(e) {
        (this.included = !0),
          this.label &&
            (this.label.include(e), e.includedLabels.add(this.label.name)),
          (e.brokenFlow = this.label ? ie : ne);
      }
    },
    DoWhileStatement: class extends Tt {
      hasEffects(e) {
        if (this.test.hasEffects(e)) return !0;
        const {
          brokenFlow: t,
          ignore: { breaks: s, continues: n },
        } = e;
        return (
          (e.ignore.breaks = !0),
          (e.ignore.continues = !0),
          !!this.body.hasEffects(e) ||
            ((e.ignore.breaks = s),
            (e.ignore.continues = n),
            (e.brokenFlow = t),
            !1)
        );
      }
      include(e, t) {
        (this.included = !0), this.test.include(e, t);
        const { brokenFlow: s } = e;
        this.body.include(e, t), (e.brokenFlow = s);
      }
    },
    EmptyStatement: class extends Tt {
      hasEffects() {
        return !1;
      }
    },
    ExportAllDeclaration: Xs,
    ExportDefaultDeclaration: rs,
    ExportNamedDeclaration: on,
    ExpressionStatement: tn,
    ForInStatement: class extends Tt {
      bind() {
        this.left.bind(),
          this.left.deoptimizePath(Q),
          this.right.bind(),
          this.body.bind();
      }
      createScope(e) {
        this.scope = new Qs(e);
      }
      hasEffects(e) {
        if (
          (this.left &&
            (this.left.hasEffects(e) ||
              this.left.hasEffectsWhenAssignedAtPath(Q, e))) ||
          (this.right && this.right.hasEffects(e))
        )
          return !0;
        const {
          brokenFlow: t,
          ignore: { breaks: s, continues: n },
        } = e;
        return (
          (e.ignore.breaks = !0),
          (e.ignore.continues = !0),
          !!this.body.hasEffects(e) ||
            ((e.ignore.breaks = s),
            (e.ignore.continues = n),
            (e.brokenFlow = t),
            !1)
        );
      }
      include(e, t) {
        (this.included = !0),
          this.left.includeWithAllDeclaredVariables(t, e),
          this.left.deoptimizePath(Q),
          this.right.include(e, t);
        const { brokenFlow: s } = e;
        this.body.include(e, t), (e.brokenFlow = s);
      }
      render(e, t) {
        this.left.render(e, t, be),
          this.right.render(e, t, be),
          110 === e.original.charCodeAt(this.right.start - 1) &&
            e.prependLeft(this.right.start, " "),
          this.body.render(e, t);
      }
    },
    ForOfStatement: class extends Tt {
      bind() {
        this.left.bind(),
          this.left.deoptimizePath(Q),
          this.right.bind(),
          this.body.bind();
      }
      createScope(e) {
        this.scope = new Qs(e);
      }
      hasEffects() {
        return !0;
      }
      include(e, t) {
        (this.included = !0),
          this.left.includeWithAllDeclaredVariables(t, e),
          this.left.deoptimizePath(Q),
          this.right.include(e, t);
        const { brokenFlow: s } = e;
        this.body.include(e, t), (e.brokenFlow = s);
      }
      render(e, t) {
        this.left.render(e, t, be),
          this.right.render(e, t, be),
          102 === e.original.charCodeAt(this.right.start - 1) &&
            e.prependLeft(this.right.start, " "),
          this.body.render(e, t);
      }
    },
    ForStatement: class extends Tt {
      createScope(e) {
        this.scope = new Qs(e);
      }
      hasEffects(e) {
        if (
          (this.init && this.init.hasEffects(e)) ||
          (this.test && this.test.hasEffects(e)) ||
          (this.update && this.update.hasEffects(e))
        )
          return !0;
        const {
          brokenFlow: t,
          ignore: { breaks: s, continues: n },
        } = e;
        return (
          (e.ignore.breaks = !0),
          (e.ignore.continues = !0),
          !!this.body.hasEffects(e) ||
            ((e.ignore.breaks = s),
            (e.ignore.continues = n),
            (e.brokenFlow = t),
            !1)
        );
      }
      include(e, t) {
        (this.included = !0),
          this.init && this.init.include(e, t),
          this.test && this.test.include(e, t);
        const { brokenFlow: s } = e;
        this.update && this.update.include(e, t),
          this.body.include(e, t),
          (e.brokenFlow = s);
      }
      render(e, t) {
        this.init && this.init.render(e, t, be),
          this.test && this.test.render(e, t, be),
          this.update && this.update.render(e, t, be),
          this.body.render(e, t);
      }
    },
    FunctionDeclaration: ns,
    FunctionExpression: class extends ss {},
    Identifier: es,
    IfStatement: class extends Tt {
      bind() {
        super.bind(),
          (this.testValue = this.test.getLiteralValueAtPath(Q, te, this));
      }
      deoptimizeCache() {
        this.testValue = Te;
      }
      hasEffects(e) {
        if (this.test.hasEffects(e)) return !0;
        if (this.testValue === Te) {
          const { brokenFlow: t } = e;
          if (this.consequent.hasEffects(e)) return !0;
          const s = e.brokenFlow;
          return (
            (e.brokenFlow = t),
            null === this.alternate
              ? !1
              : !!this.alternate.hasEffects(e) ||
                ((e.brokenFlow = e.brokenFlow < s ? e.brokenFlow : s), !1)
          );
        }
        return this.testValue
          ? this.consequent.hasEffects(e)
          : null !== this.alternate && this.alternate.hasEffects(e);
      }
      include(e, t) {
        (this.included = !0),
          t
            ? this.includeRecursively(t, e)
            : this.testValue === Te
            ? this.includeUnknownTest(e)
            : this.includeKnownTest(e);
      }
      render(e, t) {
        if (
          this.test.included ||
          (this.testValue
            ? null !== this.alternate && this.alternate.included
            : this.consequent.included)
        )
          this.test.included
            ? this.test.render(e, t)
            : e.overwrite(
                this.test.start,
                this.test.end,
                this.testValue ? "true" : "false"
              ),
            this.consequent.included
              ? this.consequent.render(e, t)
              : e.overwrite(this.consequent.start, this.consequent.end, ";"),
            null !== this.alternate &&
              (this.alternate.included
                ? this.alternate.render(e, t)
                : e.remove(this.consequent.end, this.alternate.end));
        else {
          const s = this.testValue ? this.consequent : this.alternate;
          e.remove(this.start, s.start),
            e.remove(s.end, this.end),
            Ee(this, e),
            s.render(e, t);
        }
      }
      includeKnownTest(e) {
        this.test.shouldBeIncluded(e) && this.test.include(e, !1),
          this.testValue &&
            this.consequent.shouldBeIncluded(e) &&
            this.consequent.include(e, !1),
          null !== this.alternate &&
            !this.testValue &&
            this.alternate.shouldBeIncluded(e) &&
            this.alternate.include(e, !1);
      }
      includeRecursively(e, t) {
        this.test.include(t, e),
          this.consequent.include(t, e),
          null !== this.alternate && this.alternate.include(t, e);
      }
      includeUnknownTest(e) {
        this.test.include(e, !1);
        const { brokenFlow: t } = e;
        let s = se;
        this.consequent.shouldBeIncluded(e) &&
          (this.consequent.include(e, !1),
          (s = e.brokenFlow),
          (e.brokenFlow = t)),
          null !== this.alternate &&
            this.alternate.shouldBeIncluded(e) &&
            (this.alternate.include(e, !1),
            (e.brokenFlow = e.brokenFlow < s ? e.brokenFlow : s));
      }
    },
    ImportDeclaration: hn,
    ImportExpression: class extends Tt {
      constructor() {
        super(...arguments), (this.exportMode = "auto");
      }
      hasEffects() {
        return !0;
      }
      include(e, t) {
        this.included ||
          ((this.included = !0), this.context.includeDynamicImport(this)),
          this.source.include(e, t);
      }
      initialise() {
        this.context.addDynamicImport(this);
      }
      render(e, t) {
        if (this.inlineNamespace) {
          const s = t.compact ? "" : " ",
            n = t.compact ? "" : ";";
          return void e.overwrite(
            this.start,
            this.end,
            `Promise.resolve().then(function${s}()${s}{${s}return ${this.inlineNamespace.getName()}${n}${s}})`
          );
        }
        const s = this.getDynamicImportMechanism(t);
        s &&
          (e.overwrite(
            this.start,
            ve(e.original, "(", this.start + 6) + 1,
            s.left
          ),
          e.overwrite(this.end - 1, this.end, s.right)),
          this.source.render(e, t);
      }
      renderFinalResolution(e, t, s) {
        this.included &&
          ("amd" === s &&
            t.startsWith("'.") &&
            t.endsWith(".js'") &&
            (t = t.slice(0, -4) + "'"),
          e.overwrite(this.source.start, this.source.end, t));
      }
      setResolution(e, t) {
        (this.exportMode = e),
          t
            ? (this.inlineNamespace = t)
            : (this.scope.addAccessedGlobalsByFormat({
                amd: ["require"],
                cjs: ["require"],
                system: ["module"],
              }),
              "auto" === e &&
                this.scope.addAccessedGlobalsByFormat({
                  amd: [ls],
                  cjs: [ls],
                }));
      }
      getDynamicImportMechanism(e) {
        switch (e.format) {
          case "cjs": {
            const t = e.compact ? "" : " ",
              s = e.compact ? "c" : "resolve";
            switch (this.exportMode) {
              case "default":
                return {
                  left: `new Promise(function${t}(${s})${t}{${t}${s}({${t}'default':${t}require(`,
                  right: `)${t}});${t}})`,
                };
              case "auto":
                return {
                  left: `new Promise(function${t}(${s})${t}{${t}${s}(${ls}(require(`,
                  right: `)));${t}})`,
                };
              default:
                return {
                  left: `new Promise(function${t}(${s})${t}{${t}${s}(require(`,
                  right: `));${t}})`,
                };
            }
          }
          case "amd": {
            const t = e.compact ? "" : " ",
              s = e.compact ? "c" : "resolve",
              n = e.compact ? "e" : "reject";
            return {
              left: `new Promise(function${t}(${s},${t}${n})${t}{${t}require([`,
              right: `],${t}${
                "default" === this.exportMode
                  ? `function${t}(m)${t}{${t}${s}({${t}'default':${t}m${t}});${t}}`
                  : "auto" === this.exportMode
                  ? `function${t}(m)${t}{${t}${s}(${ls}(m));${t}}`
                  : s
              },${t}${n})${t}})`,
            };
          }
          case "system":
            return { left: "module.import(", right: ")" };
          case "es":
            if (e.dynamicImportFunction)
              return { left: `${e.dynamicImportFunction}(`, right: ")" };
        }
        return null;
      }
    },
    LabeledStatement: class extends Tt {
      hasEffects(e) {
        const t = e.brokenFlow;
        return (
          e.ignore.labels.add(this.label.name),
          !!this.body.hasEffects(e) ||
            (e.ignore.labels.delete(this.label.name),
            e.includedLabels.has(this.label.name) &&
              (e.includedLabels.delete(this.label.name), (e.brokenFlow = t)),
            !1)
        );
      }
      include(e, t) {
        this.included = !0;
        const s = e.brokenFlow;
        this.body.include(e, t),
          e.includedLabels.has(this.label.name) &&
            (this.label.include(e),
            e.includedLabels.delete(this.label.name),
            (e.brokenFlow = s));
      }
      render(e, t) {
        this.label.included
          ? this.label.render(e, t)
          : e.remove(this.start, ve(e.original, ":", this.label.end) + 1),
          this.body.render(e, t);
      }
    },
    Literal: ln,
    LogicalExpression: class extends Tt {
      constructor() {
        super(...arguments),
          (this.expressionsToBeDeoptimized = []),
          (this.isBranchResolutionAnalysed = !1),
          (this.unusedBranch = null),
          (this.usedBranch = null);
      }
      bind() {
        super.bind(),
          this.isBranchResolutionAnalysed || this.analyseBranchResolution();
      }
      deoptimizeCache() {
        if (null !== this.usedBranch) {
          (this.usedBranch = null), this.unusedBranch.deoptimizePath(J);
          for (const e of this.expressionsToBeDeoptimized) e.deoptimizeCache();
        }
      }
      deoptimizePath(e) {
        e.length > 0 &&
          (this.isBranchResolutionAnalysed || this.analyseBranchResolution(),
          null === this.usedBranch
            ? (this.left.deoptimizePath(e), this.right.deoptimizePath(e))
            : this.usedBranch.deoptimizePath(e));
      }
      getLiteralValueAtPath(e, t, s) {
        return (
          this.isBranchResolutionAnalysed || this.analyseBranchResolution(),
          null === this.usedBranch
            ? Te
            : (this.expressionsToBeDeoptimized.push(s),
              this.usedBranch.getLiteralValueAtPath(e, t, s))
        );
      }
      getReturnExpressionWhenCalledAtPath(e, t, s) {
        return (
          this.isBranchResolutionAnalysed || this.analyseBranchResolution(),
          null === this.usedBranch
            ? new an([
                this.left.getReturnExpressionWhenCalledAtPath(e, t, s),
                this.right.getReturnExpressionWhenCalledAtPath(e, t, s),
              ])
            : (this.expressionsToBeDeoptimized.push(s),
              this.usedBranch.getReturnExpressionWhenCalledAtPath(e, t, s))
        );
      }
      hasEffects(e) {
        return null === this.usedBranch
          ? this.left.hasEffects(e) || this.right.hasEffects(e)
          : this.usedBranch.hasEffects(e);
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        return (
          0 !== e.length &&
          (null === this.usedBranch
            ? this.left.hasEffectsWhenAccessedAtPath(e, t) ||
              this.right.hasEffectsWhenAccessedAtPath(e, t)
            : this.usedBranch.hasEffectsWhenAccessedAtPath(e, t))
        );
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        return (
          0 === e.length ||
          (null === this.usedBranch
            ? this.left.hasEffectsWhenAssignedAtPath(e, t) ||
              this.right.hasEffectsWhenAssignedAtPath(e, t)
            : this.usedBranch.hasEffectsWhenAssignedAtPath(e, t))
        );
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        return null === this.usedBranch
          ? this.left.hasEffectsWhenCalledAtPath(e, t, s) ||
              this.right.hasEffectsWhenCalledAtPath(e, t, s)
          : this.usedBranch.hasEffectsWhenCalledAtPath(e, t, s);
      }
      include(e, t) {
        (this.included = !0),
          t || null === this.usedBranch || this.unusedBranch.shouldBeIncluded(e)
            ? (this.left.include(e, t), this.right.include(e, t))
            : this.usedBranch.include(e, t);
      }
      render(
        e,
        t,
        {
          renderedParentType: s,
          isCalleeOfRenderedParent: n,
          preventASI: i,
        } = Wt
      ) {
        if (this.left.included && this.right.included) super.render(e, t);
        else {
          const r = ve(e.original, this.operator, this.left.end);
          this.right.included
            ? (e.remove(this.start, r + 2), i && ke(e, r + 2, this.right.start))
            : e.remove(r, this.end),
            Ee(this, e),
            this.usedBranch.render(e, t, {
              isCalleeOfRenderedParent: s ? n : this.parent.callee === this,
              renderedParentType: s || this.parent.type,
            });
        }
      }
      analyseBranchResolution() {
        this.isBranchResolutionAnalysed = !0;
        const e = this.left.getLiteralValueAtPath(Q, te, this);
        e !== Te &&
          (("||" === this.operator
          ? e
          : !e)
            ? ((this.usedBranch = this.left), (this.unusedBranch = this.right))
            : ((this.usedBranch = this.right),
              (this.unusedBranch = this.left)));
      }
    },
    MemberExpression: un,
    MetaProperty: class extends Tt {
      hasEffects() {
        return !1;
      }
      hasEffectsWhenAccessedAtPath(e) {
        return e.length > 1;
      }
      include() {
        if (!this.included) {
          this.included = !0;
          const e = this.parent,
            t = (this.metaProperty =
              e instanceof un && "string" == typeof e.propertyKey
                ? e.propertyKey
                : null);
          t &&
            (t.startsWith(_n) || t.startsWith(Nn) || t.startsWith($n)
              ? this.scope.addAccessedGlobalsByFormat(In)
              : this.scope.addAccessedGlobalsByFormat(wn));
        }
      }
      initialise() {
        "import" === this.meta.name && this.context.addImportMeta(this);
      }
      renderFinalMechanism(e, t, s, n) {
        if (!this.included) return;
        const i = this.parent,
          r = this.metaProperty;
        if (r && (r.startsWith(_n) || r.startsWith(Nn) || r.startsWith($n))) {
          let a,
            o = null,
            h = null,
            l = null;
          r.startsWith(_n)
            ? ((o = r.substr(_n.length)), (a = n.getFileName(o)))
            : r.startsWith(Nn)
            ? (this.context.warnDeprecation(
                `Using the "${Nn}" prefix to reference files is deprecated. Use the "${_n}" prefix instead.`,
                !1
              ),
              (h = r.substr(Nn.length)),
              (a = n.getFileName(h)))
            : (this.context.warnDeprecation(
                `Using the "${$n}" prefix to reference files is deprecated. Use the "${_n}" prefix instead.`,
                !1
              ),
              (l = r.substr($n.length)),
              (a = n.getFileName(l)));
          const c = yt(St(bt(t), a));
          let u;
          return (
            null !== h &&
              (u = n.hookFirstSync("resolveAssetUrl", [
                {
                  assetFileName: a,
                  chunkId: t,
                  format: s,
                  moduleId: this.context.module.id,
                  relativeAssetPath: c,
                },
              ])),
            u ||
              (u = n.hookFirstSync("resolveFileUrl", [
                {
                  assetReferenceId: h,
                  chunkId: t,
                  chunkReferenceId: l,
                  fileName: a,
                  format: s,
                  moduleId: this.context.module.id,
                  referenceId: o || h || l,
                  relativePath: c,
                },
              ])),
            void e.overwrite(i.start, i.end, u, { contentOnly: !0 })
          );
        }
        const a = n.hookFirstSync("resolveImportMeta", [
          r,
          { chunkId: t, format: s, moduleId: this.context.module.id },
        ]);
        "string" == typeof a &&
          (i instanceof un
            ? e.overwrite(i.start, i.end, a, { contentOnly: !0 })
            : e.overwrite(this.start, this.end, a, { contentOnly: !0 }));
      }
    },
    MethodDefinition: class extends Tt {
      hasEffects(e) {
        return this.key.hasEffects(e);
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        return e.length > 0 || this.value.hasEffectsWhenCalledAtPath(Q, t, s);
      }
    },
    NewExpression: class extends Tt {
      bind() {
        super.bind();
        for (const e of this.arguments) e.deoptimizePath(J);
      }
      hasEffects(e) {
        for (const t of this.arguments) if (t.hasEffects(e)) return !0;
        return (
          (!this.context.annotations || !this.annotatedPure) &&
          (this.callee.hasEffects(e) ||
            this.callee.hasEffectsWhenCalledAtPath(Q, this.callOptions, e))
        );
      }
      hasEffectsWhenAccessedAtPath(e) {
        return e.length > 1;
      }
      initialise() {
        this.callOptions = { args: this.arguments, withNew: !0 };
      }
    },
    ObjectExpression: class extends Tt {
      constructor() {
        super(...arguments),
          (this.deoptimizedPaths = new Set()),
          (this.expressionsToBeDeoptimized = new Map()),
          (this.hasUnknownDeoptimizedProperty = !1),
          (this.propertyMap = null),
          (this.unmatchablePropertiesRead = []),
          (this.unmatchablePropertiesWrite = []);
      }
      bind() {
        super.bind(), null === this.propertyMap && this.buildPropertyMap();
      }
      deoptimizeCache() {
        this.hasUnknownDeoptimizedProperty || this.deoptimizeAllProperties();
      }
      deoptimizePath(e) {
        if (this.hasUnknownDeoptimizedProperty) return;
        if (
          (null === this.propertyMap && this.buildPropertyMap(), 0 === e.length)
        )
          return void this.deoptimizeAllProperties();
        const t = e[0];
        if (1 === e.length) {
          if ("string" != typeof t) return void this.deoptimizeAllProperties();
          if (!this.deoptimizedPaths.has(t)) {
            this.deoptimizedPaths.add(t);
            const e = this.expressionsToBeDeoptimized.get(t);
            if (e) for (const t of e) t.deoptimizeCache();
          }
        }
        const s = 1 === e.length ? J : e.slice(1);
        for (const e of "string" == typeof t
          ? this.propertyMap[t]
            ? this.propertyMap[t].propertiesRead
            : []
          : this.properties)
          e.deoptimizePath(s);
      }
      getLiteralValueAtPath(e, t, s) {
        null === this.propertyMap && this.buildPropertyMap();
        const n = e[0];
        if (
          0 === e.length ||
          this.hasUnknownDeoptimizedProperty ||
          "string" != typeof n ||
          this.deoptimizedPaths.has(n)
        )
          return Te;
        if (
          1 === e.length &&
          !this.propertyMap[n] &&
          !Ze[n] &&
          0 === this.unmatchablePropertiesRead.length
        ) {
          const e = this.expressionsToBeDeoptimized.get(n);
          return void (e
            ? e.push(s)
            : this.expressionsToBeDeoptimized.set(n, [s]));
        }
        if (
          !this.propertyMap[n] ||
          null === this.propertyMap[n].exactMatchRead ||
          this.propertyMap[n].propertiesRead.length > 1
        )
          return Te;
        const i = this.expressionsToBeDeoptimized.get(n);
        return (
          i ? i.push(s) : this.expressionsToBeDeoptimized.set(n, [s]),
          this.propertyMap[n].exactMatchRead.getLiteralValueAtPath(
            e.slice(1),
            t,
            s
          )
        );
      }
      getReturnExpressionWhenCalledAtPath(e, t, s) {
        null === this.propertyMap && this.buildPropertyMap();
        const n = e[0];
        if (
          0 === e.length ||
          this.hasUnknownDeoptimizedProperty ||
          "string" != typeof n ||
          this.deoptimizedPaths.has(n)
        )
          return Re;
        if (
          1 === e.length &&
          Ze[n] &&
          0 === this.unmatchablePropertiesRead.length &&
          (!this.propertyMap[n] || null === this.propertyMap[n].exactMatchRead)
        )
          return rt(Ze, n);
        if (
          !this.propertyMap[n] ||
          null === this.propertyMap[n].exactMatchRead ||
          this.propertyMap[n].propertiesRead.length > 1
        )
          return Re;
        const i = this.expressionsToBeDeoptimized.get(n);
        return (
          i ? i.push(s) : this.expressionsToBeDeoptimized.set(n, [s]),
          this.propertyMap[
            n
          ].exactMatchRead.getReturnExpressionWhenCalledAtPath(e.slice(1), t, s)
        );
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        if (0 === e.length) return !1;
        const s = e[0];
        if (
          e.length > 1 &&
          (this.hasUnknownDeoptimizedProperty ||
            "string" != typeof s ||
            this.deoptimizedPaths.has(s) ||
            !this.propertyMap[s] ||
            null === this.propertyMap[s].exactMatchRead)
        )
          return !0;
        const n = e.slice(1);
        for (const e of "string" != typeof s
          ? this.properties
          : this.propertyMap[s]
          ? this.propertyMap[s].propertiesRead
          : [])
          if (e.hasEffectsWhenAccessedAtPath(n, t)) return !0;
        return !1;
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        if (0 === e.length) return !1;
        const s = e[0];
        if (
          e.length > 1 &&
          (this.hasUnknownDeoptimizedProperty ||
            "string" != typeof s ||
            this.deoptimizedPaths.has(s) ||
            !this.propertyMap[s] ||
            null === this.propertyMap[s].exactMatchRead)
        )
          return !0;
        const n = e.slice(1);
        for (const i of "string" != typeof s
          ? this.properties
          : e.length > 1
          ? this.propertyMap[s].propertiesRead
          : this.propertyMap[s]
          ? this.propertyMap[s].propertiesSet
          : [])
          if (i.hasEffectsWhenAssignedAtPath(n, t)) return !0;
        return !1;
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        const n = e[0];
        if (
          0 === e.length ||
          this.hasUnknownDeoptimizedProperty ||
          "string" != typeof n ||
          this.deoptimizedPaths.has(n) ||
          (this.propertyMap[n]
            ? !this.propertyMap[n].exactMatchRead
            : e.length > 1 || !Ze[n])
        )
          return !0;
        const i = e.slice(1);
        for (const e of this.propertyMap[n]
          ? this.propertyMap[n].propertiesRead
          : [])
          if (e.hasEffectsWhenCalledAtPath(i, t, s)) return !0;
        return !(1 !== e.length || !Ze[n]) && it(Ze, n, this.included, t, s);
      }
      render(e, t, { renderedParentType: s } = Wt) {
        super.render(e, t),
          s === ce &&
            (e.appendRight(this.start, "("), e.prependLeft(this.end, ")"));
      }
      buildPropertyMap() {
        this.propertyMap = Object.create(null);
        for (let e = this.properties.length - 1; e >= 0; e--) {
          const t = this.properties[e];
          if (t instanceof Ln) {
            this.unmatchablePropertiesRead.push(t);
            continue;
          }
          const s = "get" !== t.kind,
            n = "set" !== t.kind;
          let i;
          if (t.computed) {
            const e = t.key.getLiteralValueAtPath(Q, te, this);
            if (e === Te) {
              n
                ? this.unmatchablePropertiesRead.push(t)
                : this.unmatchablePropertiesWrite.push(t);
              continue;
            }
            i = String(e);
          } else i = t.key instanceof es ? t.key.name : String(t.key.value);
          const r = this.propertyMap[i];
          r
            ? (n &&
                null === r.exactMatchRead &&
                ((r.exactMatchRead = t),
                r.propertiesRead.push(t, ...this.unmatchablePropertiesRead)),
              s &&
                !n &&
                null === r.exactMatchWrite &&
                ((r.exactMatchWrite = t),
                r.propertiesSet.push(t, ...this.unmatchablePropertiesWrite)))
            : (this.propertyMap[i] = {
                exactMatchRead: n ? t : null,
                exactMatchWrite: s ? t : null,
                propertiesRead: n ? [t, ...this.unmatchablePropertiesRead] : [],
                propertiesSet:
                  s && !n ? [t, ...this.unmatchablePropertiesWrite] : [],
              });
        }
      }
      deoptimizeAllProperties() {
        this.hasUnknownDeoptimizedProperty = !0;
        for (const e of this.properties) e.deoptimizePath(J);
        for (const e of this.expressionsToBeDeoptimized.values())
          for (const t of e) t.deoptimizeCache();
      }
    },
    ObjectPattern: class extends Tt {
      addExportedVariables(e) {
        for (const t of this.properties)
          t.type === ge
            ? t.value.addExportedVariables(e)
            : t.argument.addExportedVariables(e);
      }
      declare(e, t) {
        const s = [];
        for (const n of this.properties) s.push(...n.declare(e, t));
        return s;
      }
      deoptimizePath(e) {
        if (0 === e.length)
          for (const t of this.properties) t.deoptimizePath(e);
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        if (e.length > 0) return !0;
        for (const e of this.properties)
          if (e.hasEffectsWhenAssignedAtPath(Q, t)) return !0;
        return !1;
      }
    },
    Program: Tn,
    Property: class extends Tt {
      constructor() {
        super(...arguments),
          (this.declarationInit = null),
          (this.returnExpression = null);
      }
      bind() {
        super.bind(),
          "get" === this.kind &&
            null === this.returnExpression &&
            this.updateReturnExpression(),
          null !== this.declarationInit &&
            this.declarationInit.deoptimizePath([X, X]);
      }
      declare(e, t) {
        return (this.declarationInit = t), this.value.declare(e, Re);
      }
      deoptimizeCache() {
        throw new Error("Unexpected deoptimization");
      }
      deoptimizePath(e) {
        "get" === this.kind
          ? e.length > 0 &&
            (null === this.returnExpression && this.updateReturnExpression(),
            this.returnExpression.deoptimizePath(e))
          : "set" !== this.kind && this.value.deoptimizePath(e);
      }
      getLiteralValueAtPath(e, t, s) {
        return "get" === this.kind
          ? (null === this.returnExpression && this.updateReturnExpression(),
            this.returnExpression.getLiteralValueAtPath(e, t, s))
          : this.value.getLiteralValueAtPath(e, t, s);
      }
      getReturnExpressionWhenCalledAtPath(e, t, s) {
        return "get" === this.kind
          ? (null === this.returnExpression && this.updateReturnExpression(),
            this.returnExpression.getReturnExpressionWhenCalledAtPath(e, t, s))
          : this.value.getReturnExpressionWhenCalledAtPath(e, t, s);
      }
      hasEffects(e) {
        return this.key.hasEffects(e) || this.value.hasEffects(e);
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        if ("get" === this.kind) {
          const s = t.accessed.getEntities(e);
          return (
            !s.has(this) &&
            (s.add(this),
            this.value.hasEffectsWhenCalledAtPath(
              Q,
              this.accessorCallOptions,
              t
            ) ||
              (e.length > 0 &&
                this.returnExpression.hasEffectsWhenAccessedAtPath(e, t)))
          );
        }
        return this.value.hasEffectsWhenAccessedAtPath(e, t);
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        if ("get" === this.kind) {
          const s = t.assigned.getEntities(e);
          return (
            !s.has(this) &&
            (s.add(this),
            this.returnExpression.hasEffectsWhenAssignedAtPath(e, t))
          );
        }
        if ("set" === this.kind) {
          const s = t.assigned.getEntities(e);
          return (
            !s.has(this) &&
            (s.add(this),
            this.value.hasEffectsWhenCalledAtPath(
              Q,
              this.accessorCallOptions,
              t
            ))
          );
        }
        return this.value.hasEffectsWhenAssignedAtPath(e, t);
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        if ("get" === this.kind) {
          const n = (t.withNew ? s.instantiated : s.called).getEntities(e);
          return (
            !n.has(this) &&
            (n.add(this),
            this.returnExpression.hasEffectsWhenCalledAtPath(e, t, s))
          );
        }
        return this.value.hasEffectsWhenCalledAtPath(e, t, s);
      }
      initialise() {
        this.accessorCallOptions = { args: _e, withNew: !1 };
      }
      render(e, t) {
        this.shorthand || this.key.render(e, t),
          this.value.render(e, t, { isShorthandProperty: this.shorthand });
      }
      updateReturnExpression() {
        (this.returnExpression = Re),
          (this.returnExpression = this.value.getReturnExpressionWhenCalledAtPath(
            Q,
            te,
            this
          ));
      }
    },
    RestElement: ts,
    ReturnStatement: class extends Tt {
      hasEffects(e) {
        return (
          !(
            e.ignore.returnAwaitYield &&
            (null === this.argument || !this.argument.hasEffects(e))
          ) || ((e.brokenFlow = ie), !1)
        );
      }
      include(e, t) {
        (this.included = !0),
          this.argument && this.argument.include(e, t),
          (e.brokenFlow = ie);
      }
      initialise() {
        this.scope.addReturnExpression(this.argument || Re);
      }
      render(e, t) {
        this.argument &&
          (this.argument.render(e, t, { preventASI: !0 }),
          this.argument.start === this.start + 6 &&
            e.prependLeft(this.start + 6, " "));
      }
    },
    SequenceExpression: class extends Tt {
      deoptimizePath(e) {
        e.length > 0 &&
          this.expressions[this.expressions.length - 1].deoptimizePath(e);
      }
      getLiteralValueAtPath(e, t, s) {
        return this.expressions[
          this.expressions.length - 1
        ].getLiteralValueAtPath(e, t, s);
      }
      hasEffects(e) {
        for (const t of this.expressions) if (t.hasEffects(e)) return !0;
        return !1;
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        return (
          e.length > 0 &&
          this.expressions[
            this.expressions.length - 1
          ].hasEffectsWhenAccessedAtPath(e, t)
        );
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        return (
          0 === e.length ||
          this.expressions[
            this.expressions.length - 1
          ].hasEffectsWhenAssignedAtPath(e, t)
        );
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        return this.expressions[
          this.expressions.length - 1
        ].hasEffectsWhenCalledAtPath(e, t, s);
      }
      include(e, t) {
        this.included = !0;
        for (let s = 0; s < this.expressions.length - 1; s++) {
          const n = this.expressions[s];
          (t || n.shouldBeIncluded(e)) && n.include(e, t);
        }
        this.expressions[this.expressions.length - 1].include(e, t);
      }
      render(
        e,
        t,
        {
          renderedParentType: s,
          isCalleeOfRenderedParent: n,
          preventASI: i,
        } = Wt
      ) {
        let r = 0;
        for (const { node: a, start: o, end: h } of Ce(
          this.expressions,
          e,
          this.start,
          this.end
        ))
          a.included
            ? (1 === ++r && i && ke(e, o, a.start),
              a === this.expressions[this.expressions.length - 1] && 1 === r
                ? a.render(e, t, {
                    isCalleeOfRenderedParent: s
                      ? n
                      : this.parent.callee === this,
                    renderedParentType: s || this.parent.type,
                  })
                : a.render(e, t))
            : ye(a, e, o, h);
      }
    },
    SpreadElement: Ln,
    SwitchCase: Rn,
    SwitchStatement: class extends Tt {
      createScope(e) {
        this.scope = new Qs(e);
      }
      hasEffects(e) {
        if (this.discriminant.hasEffects(e)) return !0;
        const {
          brokenFlow: t,
          ignore: { breaks: s },
        } = e;
        let n = 1 / 0;
        e.ignore.breaks = !0;
        for (const s of this.cases) {
          if (s.hasEffects(e)) return !0;
          (n = e.brokenFlow < n ? e.brokenFlow : n), (e.brokenFlow = t);
        }
        return (
          null !== this.defaultCase && n !== ne && (e.brokenFlow = n),
          (e.ignore.breaks = s),
          !1
        );
      }
      include(e, t) {
        (this.included = !0), this.discriminant.include(e, t);
        const { brokenFlow: s } = e;
        let n = 1 / 0,
          i =
            t ||
            (null !== this.defaultCase &&
              this.defaultCase < this.cases.length - 1);
        for (let r = this.cases.length - 1; r >= 0; r--) {
          const a = this.cases[r];
          if ((a.included && (i = !0), !i)) {
            const e = ae();
            (e.ignore.breaks = !0), (i = a.hasEffects(e));
          }
          i &&
            (a.include(e, t),
            (n = n < e.brokenFlow ? n : e.brokenFlow),
            (e.brokenFlow = s));
        }
        i && null !== this.defaultCase && n !== ne && (e.brokenFlow = n);
      }
      initialise() {
        for (let e = 0; e < this.cases.length; e++)
          if (null === this.cases[e].test) return void (this.defaultCase = e);
        this.defaultCase = null;
      }
      render(e, t) {
        this.discriminant.render(e, t),
          this.cases.length > 0 &&
            Ae(this.cases, e, this.cases[0].start, this.end - 1, t);
      }
    },
    TaggedTemplateExpression: class extends Tt {
      bind() {
        if ((super.bind(), this.tag.type === de)) {
          this.scope.findVariable(this.tag.name).isNamespace &&
            this.context.error(
              {
                code: "CANNOT_CALL_NAMESPACE",
                message: `Cannot call a namespace ('${this.tag.name}')`,
              },
              this.start
            ),
            "eval" === this.tag.name &&
              this.context.warn(
                {
                  code: "EVAL",
                  message:
                    "Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification",
                  url: "https://rollupjs.org/guide/en/#avoiding-eval",
                },
                this.start
              );
        }
      }
      hasEffects(e) {
        return (
          super.hasEffects(e) ||
          this.tag.hasEffectsWhenCalledAtPath(Q, this.callOptions, e)
        );
      }
      initialise() {
        this.callOptions = { args: _e, withNew: !1 };
      }
    },
    TemplateElement: class extends Tt {
      hasEffects() {
        return !1;
      }
    },
    TemplateLiteral: Mn,
    ThisExpression: class extends Tt {
      bind() {
        super.bind(), (this.variable = this.scope.findVariable("this"));
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        return e.length > 0 && this.variable.hasEffectsWhenAccessedAtPath(e, t);
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        return this.variable.hasEffectsWhenAssignedAtPath(e, t);
      }
      initialise() {
        (this.alias =
          this.scope.findLexicalBoundary() instanceof On
            ? this.context.moduleContext
            : null),
          "undefined" === this.alias &&
            this.context.warn(
              {
                code: "THIS_IS_UNDEFINED",
                message:
                  "The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten",
                url: "https://rollupjs.org/guide/en/#error-this-is-undefined",
              },
              this.start
            );
      }
      render(e) {
        null !== this.alias &&
          e.overwrite(this.start, this.end, this.alias, {
            contentOnly: !1,
            storeName: !0,
          });
      }
    },
    ThrowStatement: class extends Tt {
      hasEffects() {
        return !0;
      }
      include(e, t) {
        (this.included = !0), this.argument.include(e, t), (e.brokenFlow = ie);
      }
      render(e, t) {
        this.argument.render(e, t, { preventASI: !0 }),
          this.argument.start === this.start + 5 &&
            e.prependLeft(this.start + 5, " ");
      }
    },
    TryStatement: class extends Tt {
      constructor() {
        super(...arguments), (this.directlyIncluded = !1);
      }
      hasEffects(e) {
        return (
          (this.context.tryCatchDeoptimization
            ? this.block.body.length > 0
            : this.block.hasEffects(e)) ||
          (null !== this.finalizer && this.finalizer.hasEffects(e))
        );
      }
      include(e, t) {
        const { brokenFlow: s } = e;
        (this.directlyIncluded && this.context.tryCatchDeoptimization) ||
          ((this.included = !0),
          (this.directlyIncluded = !0),
          this.block.include(e, this.context.tryCatchDeoptimization ? Lt : t),
          (e.brokenFlow = s)),
          null !== this.handler &&
            (this.handler.include(e, t), (e.brokenFlow = s)),
          null !== this.finalizer && this.finalizer.include(e, t);
      }
    },
    UnaryExpression: class extends Tt {
      bind() {
        super.bind(),
          "delete" === this.operator && this.argument.deoptimizePath(Q);
      }
      getLiteralValueAtPath(e, t, s) {
        if (e.length > 0) return Te;
        const n = this.argument.getLiteralValueAtPath(Q, t, s);
        return n === Te ? Te : Dn[this.operator](n);
      }
      hasEffects(e) {
        return (
          !("typeof" === this.operator && this.argument instanceof es) &&
          (this.argument.hasEffects(e) ||
            ("delete" === this.operator &&
              this.argument.hasEffectsWhenAssignedAtPath(Q, e)))
        );
      }
      hasEffectsWhenAccessedAtPath(e) {
        return "void" === this.operator ? e.length > 0 : e.length > 1;
      }
    },
    UnknownNode: class extends Tt {
      hasEffects() {
        return !0;
      }
      include(e) {
        super.include(e, !0);
      }
    },
    UpdateExpression: class extends Tt {
      bind() {
        if (
          (super.bind(),
          this.argument.deoptimizePath(Q),
          this.argument instanceof es)
        ) {
          this.scope.findVariable(this.argument.name).isReassigned = !0;
        }
      }
      hasEffects(e) {
        return (
          this.argument.hasEffects(e) ||
          this.argument.hasEffectsWhenAssignedAtPath(Q, e)
        );
      }
      hasEffectsWhenAccessedAtPath(e) {
        return e.length > 1;
      }
      render(e, t) {
        this.argument.render(e, t);
        const s = this.argument.variable;
        if ("system" === t.format && s && s.exportName) {
          const t = s.getName();
          if (this.prefix)
            e.overwrite(
              this.start,
              this.end,
              `exports('${s.exportName}', ${this.operator}${t})`
            );
          else {
            let n;
            switch (this.operator) {
              case "++":
                n = `${t} + 1`;
                break;
              case "--":
                n = `${t} - 1`;
            }
            e.overwrite(
              this.start,
              this.end,
              `(exports('${s.exportName}', ${n}), ${t}${this.operator})`
            );
          }
        }
      }
    },
    VariableDeclaration: Bn,
    VariableDeclarator: class extends Tt {
      declareDeclarator(e) {
        this.id.declare(e, this.init || Me);
      }
      deoptimizePath(e) {
        this.id.deoptimizePath(e);
      }
      render(e, t) {
        null === this.init || this.init.included
          ? super.render(e, t)
          : (e.remove(this.id.end, this.end), this.id.render(e, t));
      }
    },
    WhileStatement: class extends Tt {
      hasEffects(e) {
        if (this.test.hasEffects(e)) return !0;
        const {
          brokenFlow: t,
          ignore: { breaks: s, continues: n },
        } = e;
        return (
          (e.ignore.breaks = !0),
          (e.ignore.continues = !0),
          !!this.body.hasEffects(e) ||
            ((e.ignore.breaks = s),
            (e.ignore.continues = n),
            (e.brokenFlow = t),
            !1)
        );
      }
      include(e, t) {
        (this.included = !0), this.test.include(e, t);
        const { brokenFlow: s } = e;
        this.body.include(e, t), (e.brokenFlow = s);
      }
    },
    YieldExpression: class extends Tt {
      bind() {
        super.bind(), null !== this.argument && this.argument.deoptimizePath(J);
      }
      hasEffects(e) {
        return (
          !e.ignore.returnAwaitYield ||
          (null !== this.argument && this.argument.hasEffects(e))
        );
      }
      render(e, t) {
        this.argument &&
          (this.argument.render(e, t),
          this.argument.start === this.start + 5 &&
            e.prependLeft(this.start + 5, " "));
      }
    },
  };
  function Wn(e, t, s) {
    s(e, t);
  }
  function jn(e, t, s) {}
  var Un = {};
  function zn(e, t, s = e.type) {
    let n = t.commentNodes[t.commentIndex];
    for (; n && e.start >= n.end; )
      Gn(e, n), (n = t.commentNodes[++t.commentIndex]);
    n && n.end <= e.end && Un[s](e, t, zn);
  }
  function Gn(e, t) {
    e.annotations ? e.annotations.push(t) : (e.annotations = [t]),
      "ExpressionStatement" === e.type && (e = e.expression),
      ("CallExpression" !== e.type && "NewExpression" !== e.type) ||
        (e.annotatedPure = !0);
  }
  (Un.Program = Un.BlockStatement = function(e, t, s) {
    for (var n = 0, i = e.body; n < i.length; n += 1) {
      s(i[n], t, "Statement");
    }
  }),
    (Un.Statement = Wn),
    (Un.EmptyStatement = jn),
    (Un.ExpressionStatement = Un.ParenthesizedExpression = function(e, t, s) {
      return s(e.expression, t, "Expression");
    }),
    (Un.IfStatement = function(e, t, s) {
      s(e.test, t, "Expression"),
        s(e.consequent, t, "Statement"),
        e.alternate && s(e.alternate, t, "Statement");
    }),
    (Un.LabeledStatement = function(e, t, s) {
      return s(e.body, t, "Statement");
    }),
    (Un.BreakStatement = Un.ContinueStatement = jn),
    (Un.WithStatement = function(e, t, s) {
      s(e.object, t, "Expression"), s(e.body, t, "Statement");
    }),
    (Un.SwitchStatement = function(e, t, s) {
      s(e.discriminant, t, "Expression");
      for (var n = 0, i = e.cases; n < i.length; n += 1) {
        var r = i[n];
        r.test && s(r.test, t, "Expression");
        for (var a = 0, o = r.consequent; a < o.length; a += 1) {
          s(o[a], t, "Statement");
        }
      }
    }),
    (Un.SwitchCase = function(e, t, s) {
      e.test && s(e.test, t, "Expression");
      for (var n = 0, i = e.consequent; n < i.length; n += 1) {
        s(i[n], t, "Statement");
      }
    }),
    (Un.ReturnStatement = Un.YieldExpression = Un.AwaitExpression = function(
      e,
      t,
      s
    ) {
      e.argument && s(e.argument, t, "Expression");
    }),
    (Un.ThrowStatement = Un.SpreadElement = function(e, t, s) {
      return s(e.argument, t, "Expression");
    }),
    (Un.TryStatement = function(e, t, s) {
      s(e.block, t, "Statement"),
        e.handler && s(e.handler, t),
        e.finalizer && s(e.finalizer, t, "Statement");
    }),
    (Un.CatchClause = function(e, t, s) {
      e.param && s(e.param, t, "Pattern"), s(e.body, t, "Statement");
    }),
    (Un.WhileStatement = Un.DoWhileStatement = function(e, t, s) {
      s(e.test, t, "Expression"), s(e.body, t, "Statement");
    }),
    (Un.ForStatement = function(e, t, s) {
      e.init && s(e.init, t, "ForInit"),
        e.test && s(e.test, t, "Expression"),
        e.update && s(e.update, t, "Expression"),
        s(e.body, t, "Statement");
    }),
    (Un.ForInStatement = Un.ForOfStatement = function(e, t, s) {
      s(e.left, t, "ForInit"),
        s(e.right, t, "Expression"),
        s(e.body, t, "Statement");
    }),
    (Un.ForInit = function(e, t, s) {
      "VariableDeclaration" === e.type ? s(e, t) : s(e, t, "Expression");
    }),
    (Un.DebuggerStatement = jn),
    (Un.FunctionDeclaration = function(e, t, s) {
      return s(e, t, "Function");
    }),
    (Un.VariableDeclaration = function(e, t, s) {
      for (var n = 0, i = e.declarations; n < i.length; n += 1) {
        s(i[n], t);
      }
    }),
    (Un.VariableDeclarator = function(e, t, s) {
      s(e.id, t, "Pattern"), e.init && s(e.init, t, "Expression");
    }),
    (Un.Function = function(e, t, s) {
      e.id && s(e.id, t, "Pattern");
      for (var n = 0, i = e.params; n < i.length; n += 1) {
        s(i[n], t, "Pattern");
      }
      s(e.body, t, e.expression ? "Expression" : "Statement");
    }),
    (Un.Pattern = function(e, t, s) {
      "Identifier" === e.type
        ? s(e, t, "VariablePattern")
        : "MemberExpression" === e.type
        ? s(e, t, "MemberPattern")
        : s(e, t);
    }),
    (Un.VariablePattern = jn),
    (Un.MemberPattern = Wn),
    (Un.RestElement = function(e, t, s) {
      return s(e.argument, t, "Pattern");
    }),
    (Un.ArrayPattern = function(e, t, s) {
      for (var n = 0, i = e.elements; n < i.length; n += 1) {
        var r = i[n];
        r && s(r, t, "Pattern");
      }
    }),
    (Un.ObjectPattern = function(e, t, s) {
      for (var n = 0, i = e.properties; n < i.length; n += 1) {
        var r = i[n];
        "Property" === r.type
          ? (r.computed && s(r.key, t, "Expression"), s(r.value, t, "Pattern"))
          : "RestElement" === r.type && s(r.argument, t, "Pattern");
      }
    }),
    (Un.Expression = Wn),
    (Un.ThisExpression = Un.Super = Un.MetaProperty = jn),
    (Un.ArrayExpression = function(e, t, s) {
      for (var n = 0, i = e.elements; n < i.length; n += 1) {
        var r = i[n];
        r && s(r, t, "Expression");
      }
    }),
    (Un.ObjectExpression = function(e, t, s) {
      for (var n = 0, i = e.properties; n < i.length; n += 1) {
        s(i[n], t);
      }
    }),
    (Un.FunctionExpression = Un.ArrowFunctionExpression =
      Un.FunctionDeclaration),
    (Un.SequenceExpression = function(e, t, s) {
      for (var n = 0, i = e.expressions; n < i.length; n += 1) {
        s(i[n], t, "Expression");
      }
    }),
    (Un.TemplateLiteral = function(e, t, s) {
      for (var n = 0, i = e.quasis; n < i.length; n += 1) {
        s(i[n], t);
      }
      for (var r = 0, a = e.expressions; r < a.length; r += 1) {
        s(a[r], t, "Expression");
      }
    }),
    (Un.TemplateElement = jn),
    (Un.UnaryExpression = Un.UpdateExpression = function(e, t, s) {
      s(e.argument, t, "Expression");
    }),
    (Un.BinaryExpression = Un.LogicalExpression = function(e, t, s) {
      s(e.left, t, "Expression"), s(e.right, t, "Expression");
    }),
    (Un.AssignmentExpression = Un.AssignmentPattern = function(e, t, s) {
      s(e.left, t, "Pattern"), s(e.right, t, "Expression");
    }),
    (Un.ConditionalExpression = function(e, t, s) {
      s(e.test, t, "Expression"),
        s(e.consequent, t, "Expression"),
        s(e.alternate, t, "Expression");
    }),
    (Un.NewExpression = Un.CallExpression = function(e, t, s) {
      if ((s(e.callee, t, "Expression"), e.arguments))
        for (var n = 0, i = e.arguments; n < i.length; n += 1) {
          s(i[n], t, "Expression");
        }
    }),
    (Un.MemberExpression = function(e, t, s) {
      s(e.object, t, "Expression"),
        e.computed && s(e.property, t, "Expression");
    }),
    (Un.ExportNamedDeclaration = Un.ExportDefaultDeclaration = function(
      e,
      t,
      s
    ) {
      e.declaration &&
        s(
          e.declaration,
          t,
          "ExportNamedDeclaration" === e.type || e.declaration.id
            ? "Statement"
            : "Expression"
        ),
        e.source && s(e.source, t, "Expression");
    }),
    (Un.ExportAllDeclaration = function(e, t, s) {
      s(e.source, t, "Expression");
    }),
    (Un.ImportDeclaration = function(e, t, s) {
      for (var n = 0, i = e.specifiers; n < i.length; n += 1) {
        s(i[n], t);
      }
      s(e.source, t, "Expression");
    }),
    (Un.ImportExpression = function(e, t, s) {
      s(e.source, t, "Expression");
    }),
    (Un.ImportSpecifier = Un.ImportDefaultSpecifier = Un.ImportNamespaceSpecifier = Un.Identifier = Un.Literal = jn),
    (Un.TaggedTemplateExpression = function(e, t, s) {
      s(e.tag, t, "Expression"), s(e.quasi, t, "Expression");
    }),
    (Un.ClassDeclaration = Un.ClassExpression = function(e, t, s) {
      return s(e, t, "Class");
    }),
    (Un.Class = function(e, t, s) {
      e.id && s(e.id, t, "Pattern"),
        e.superClass && s(e.superClass, t, "Expression"),
        s(e.body, t);
    }),
    (Un.ClassBody = function(e, t, s) {
      for (var n = 0, i = e.body; n < i.length; n += 1) {
        s(i[n], t);
      }
    }),
    (Un.MethodDefinition = Un.Property = function(e, t, s) {
      e.computed && s(e.key, t, "Expression"), s(e.value, t, "Expression");
    });
  const Hn = /[@#]__PURE__/,
    qn = (e) => Hn.test(e.text);
  let Kn = "sourceMa";
  Kn += "ppingURL";
  const Yn = new RegExp(`^#\\s+${Kn}=.+\\n?`),
    Xn = () => {};
  let Qn = () => [0, 0],
    Jn = () => 0,
    Zn = () => 0,
    ei = {};
  const ti = (e) => 1e3 * e[0] + e[1] / 1e6;
  function si(e, t) {
    switch (t) {
      case 1:
        return `# ${e}`;
      case 2:
        return `## ${e}`;
      case 3:
        return e;
      default:
        return `${"  ".repeat(t - 4)}- ${e}`;
    }
  }
  function ni(e, t = 3) {
    (e = si(e, t)),
      ei.hasOwnProperty(e) ||
        (ei[e] = {
          memory: 0,
          startMemory: void 0,
          startTime: void 0,
          time: 0,
          totalMemory: 0,
        });
    const s = Zn();
    (ei[e].startTime = Qn()), (ei[e].startMemory = s);
  }
  function ii(e, t = 3) {
    if (((e = si(e, t)), ei.hasOwnProperty(e))) {
      const t = Zn();
      (ei[e].time += Jn(ei[e].startTime)),
        (ei[e].totalMemory = Math.max(ei[e].totalMemory, t)),
        (ei[e].memory += t - ei[e].startMemory);
    }
  }
  function ri() {
    const e = {};
    for (const t of Object.keys(ei))
      e[t] = [ei[t].time, ei[t].memory, ei[t].totalMemory];
    return e;
  }
  let ai = Xn,
    oi = Xn;
  const hi = {
    load: !0,
    ongenerate: !0,
    onwrite: !0,
    resolveDynamicImport: !0,
    resolveId: !0,
    transform: !0,
    transformBundle: !0,
  };
  function li(e, t) {
    const s = {};
    for (const n of Object.keys(e))
      if (!0 === hi[n]) {
        let i = `plugin ${t}`;
        e.name && (i += ` (${e.name})`),
          (i += ` - ${n}`),
          (s[n] = function() {
            ai(i, 4);
            const t = e[n].apply(this === s ? e : this, arguments);
            return (
              oi(i, 4),
              t &&
                "function" == typeof t.then &&
                (ai(`${i} (async)`, 4), t.then(() => oi(`${i} (async)`, 4))),
              t
            );
          });
      } else s[n] = e[n];
    return s;
  }
  function ci(e) {
    e.perf
      ? ((ei = {}),
        "undefined" != typeof process && "function" == typeof process.hrtime
          ? ((Qn = process.hrtime.bind(process)),
            (Jn = (e) => ti(process.hrtime(e))))
          : "undefined" != typeof performance &&
            "function" == typeof performance.now &&
            ((Qn = () => [performance.now(), 0]),
            (Jn = (e) => performance.now() - e[0])),
        "undefined" != typeof process &&
          "function" == typeof process.memoryUsage &&
          (Zn = () => process.memoryUsage().heapUsed),
        (ai = ni),
        (oi = ii),
        (e.plugins = e.plugins.map(li)))
      : ((ai = Xn), (oi = Xn));
  }
  const ui = { ecmaVersion: 2020, preserveParens: !1, sourceType: "module" };
  function di(e, t, s, n) {
    t.error(
      {
        code: "MISSING_EXPORT",
        message: `'${e}' is not exported by ${ks(s)}`,
        url:
          "https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module",
      },
      n
    );
  }
  const pi = { identifier: null, localName: os };
  class fi {
    constructor(e, t, s, n) {
      (this.chunk = null),
        (this.chunkFileNames = new Set()),
        (this.chunkName = null),
        (this.comments = []),
        (this.dependencies = []),
        (this.dynamicallyImportedBy = []),
        (this.dynamicDependencies = []),
        (this.dynamicImports = []),
        (this.entryPointsHash = new Uint8Array(10)),
        (this.execIndex = 1 / 0),
        (this.exportAllModules = []),
        (this.exportAllSources = new Set()),
        (this.exports = Object.create(null)),
        (this.exportsAll = Object.create(null)),
        (this.exportShimVariable = new cs(this)),
        (this.facadeChunk = null),
        (this.importDescriptions = Object.create(null)),
        (this.importMetas = []),
        (this.imports = new Set()),
        (this.isExecuted = !1),
        (this.isUserDefinedEntryPoint = !1),
        (this.manualChunkAlias = null),
        (this.reexportDescriptions = Object.create(null)),
        (this.sources = new Set()),
        (this.userChunkNames = new Set()),
        (this.usesTopLevelAwait = !1),
        (this.allExportNames = null),
        (this.namespaceVariable = null),
        (this.transformDependencies = []),
        (this.transitiveReexports = null),
        (this.id = t),
        (this.graph = e),
        (this.excludeFromSourcemap = /\0/.test(t)),
        (this.context = e.getModuleContext(t)),
        (this.moduleSideEffects = s),
        (this.isEntryPoint = n);
    }
    basename() {
      const e = Et(this.id),
        t = vt(this.id);
      return pt(t ? e.slice(0, -t.length) : e);
    }
    bindReferences() {
      this.ast.bind();
    }
    error(e, t) {
      if (void 0 !== t) {
        e.pos = t;
        let s = $t(this.code, t, { offsetLine: 1 });
        try {
          s = (function(e, t) {
            const s = e.filter((e) => e.mappings);
            for (; s.length > 0; ) {
              const e = s.pop(),
                n = e.mappings[t.line - 1];
              let i = !1;
              if (void 0 !== n)
                for (const s of n)
                  if (s[0] >= t.column) {
                    if (1 === s.length) break;
                    (t = {
                      column: s[3],
                      line: s[2] + 1,
                      name: 5 === s.length ? e.names[s[4]] : void 0,
                      source: e.sources[s[1]],
                    }),
                      (i = !0);
                    break;
                  }
              if (!i)
                throw new Error("Can't resolve original location of error.");
            }
            return t;
          })(this.sourcemapChain, s);
        } catch (e) {
          this.warn(
            {
              code: "SOURCEMAP_ERROR",
              loc: { column: s.column, file: this.id, line: s.line },
              message: `Error when using sourcemap for reporting an error: ${e.message}`,
              pos: t,
            },
            void 0
          );
        }
        (e.loc = { column: s.column, file: this.id, line: s.line }),
          (e.frame = Ss(this.originalCode, s.line, s.column));
      }
      ws(e);
    }
    getAllExportNames() {
      if (this.allExportNames) return this.allExportNames;
      const e = (this.allExportNames = new Set());
      for (const t of Object.keys(this.exports)) e.add(t);
      for (const t of Object.keys(this.reexportDescriptions)) e.add(t);
      for (const t of this.exportAllModules)
        if (t instanceof Ct) e.add(`*${t.id}`);
        else for (const s of t.getAllExportNames()) "default" !== s && e.add(s);
      return e;
    }
    getDynamicImportExpressions() {
      return this.dynamicImports.map(({ node: e }) => {
        const t = e.source;
        return t instanceof Mn &&
          1 === t.quasis.length &&
          t.quasis[0].value.cooked
          ? t.quasis[0].value.cooked
          : t instanceof ln && "string" == typeof t.value
          ? t.value
          : t;
      });
    }
    getExportNamesByVariable() {
      const e = new Map();
      for (const t of this.getAllExportNames()) {
        const s = this.getVariableForExportName(t);
        if (!s || !(s.included || s instanceof ot)) continue;
        const n = e.get(s);
        n ? n.push(t) : e.set(s, [t]);
      }
      return e;
    }
    getExports() {
      return Object.keys(this.exports);
    }
    getOrCreateNamespace() {
      return (
        this.namespaceVariable ||
          ((this.namespaceVariable = new us(this.astContext)),
          this.namespaceVariable.initialise()),
        this.namespaceVariable
      );
    }
    getReexports() {
      if (this.transitiveReexports) return this.transitiveReexports;
      this.transitiveReexports = [];
      const e = new Set();
      for (const t in this.reexportDescriptions) e.add(t);
      for (const t of this.exportAllModules)
        if (t instanceof Ct) e.add(`*${t.id}`);
        else
          for (const s of t.getExports().concat(t.getReexports()))
            "default" !== s && e.add(s);
      return (this.transitiveReexports = Array.from(e));
    }
    getRenderedExports() {
      const e = [],
        t = [];
      for (const s in this.exports) {
        const n = this.getVariableForExportName(s);
        (n && n.included ? e : t).push(s);
      }
      return { renderedExports: e, removedExports: t };
    }
    getTransitiveDependencies() {
      return this.dependencies.concat(
        this.getReexports().map((e) => this.getVariableForExportName(e).module)
      );
    }
    getVariableForExportName(e, t) {
      if ("*" === e[0]) {
        if (1 === e.length) return this.getOrCreateNamespace();
        return this.graph.moduleById
          .get(e.slice(1))
          .getVariableForExportName("*");
      }
      const s = this.reexportDescriptions[e];
      if (s) {
        const e = s.module.getVariableForExportName(s.localName);
        return e || di(s.localName, this, s.module.id, s.start), e;
      }
      const n = this.exports[e];
      if (n) {
        if (n === pi) return this.exportShimVariable;
        const e = n.localName;
        return this.traceVariable(e) || this.graph.scope.findVariable(e);
      }
      if ("default" !== e)
        for (const t of this.exportAllModules) {
          const s = t.getVariableForExportName(e, !0);
          if (s) return s;
        }
      if (this.graph.shimMissingExports && !t)
        return this.shimMissingExport(e), this.exportShimVariable;
    }
    include() {
      const e = re();
      this.ast.shouldBeIncluded(e) && this.ast.include(e, !1);
    }
    includeAllExports() {
      this.isExecuted || ((this.graph.needsTreeshakingPass = !0), kt(this));
      const e = re();
      for (const t of this.getExports()) {
        const s = this.getVariableForExportName(t);
        s.deoptimizePath(J),
          s.included || (s.include(e), (this.graph.needsTreeshakingPass = !0));
      }
      for (const t of this.getReexports()) {
        const s = this.getVariableForExportName(t);
        s.deoptimizePath(J),
          s.included || (s.include(e), (this.graph.needsTreeshakingPass = !0)),
          s instanceof ot && (s.module.reexported = !0);
      }
    }
    includeAllInBundle() {
      this.ast.include(re(), !0);
    }
    isIncluded() {
      return (
        this.ast.included ||
        (this.namespaceVariable && this.namespaceVariable.included)
      );
    }
    linkDependencies() {
      for (const e of this.sources) {
        const t = this.resolvedIds[e].id;
        if (t) {
          const e = this.graph.moduleById.get(t);
          this.dependencies.push(e);
        }
      }
      for (const { resolution: e } of this.dynamicImports)
        (e instanceof fi || e instanceof Ct) &&
          this.dynamicDependencies.push(e);
      this.addModulesToImportDescriptions(this.importDescriptions),
        this.addModulesToImportDescriptions(this.reexportDescriptions);
      const e = [];
      for (const t of this.exportAllSources) {
        const s = this.graph.moduleById.get(this.resolvedIds[t].id);
        (s instanceof Ct ? e : this.exportAllModules).push(s);
      }
      this.exportAllModules = this.exportAllModules.concat(e);
    }
    render(e) {
      const t = this.magicString.clone();
      return (
        this.ast.render(t, e),
        (this.usesTopLevelAwait = this.astContext.usesTopLevelAwait),
        t
      );
    }
    setSource({
      ast: e,
      code: t,
      customTransformCache: s,
      moduleSideEffects: n,
      originalCode: i,
      originalSourcemap: r,
      resolvedIds: a,
      sourcemapChain: o,
      transformDependencies: h,
      transformFiles: l,
    }) {
      var c;
      (this.code = t),
        (this.originalCode = i),
        (this.originalSourcemap = r),
        (this.sourcemapChain = o),
        l && (this.transformFiles = l),
        (this.transformDependencies = h),
        (this.customTransformCache = s),
        "boolean" == typeof n && (this.moduleSideEffects = n),
        ai("generate ast", 3),
        (this.esTreeAst =
          e ||
          (function(e, t, s) {
            try {
              return t.parse(
                e.code,
                Object.assign(Object.assign(Object.assign({}, ui), s), {
                  onComment: (t, s, n, i) =>
                    e.comments.push({ block: t, text: s, start: n, end: i }),
                })
              );
            } catch (t) {
              let s = t.message.replace(/ \(\d+:\d+\)$/, "");
              e.id.endsWith(".json")
                ? (s +=
                    " (Note that you need rollup-plugin-json to import JSON files)")
                : e.id.endsWith(".js") ||
                  (s +=
                    " (Note that you need plugins to import files that are not JavaScript)"),
                e.error(
                  { code: "PARSE_ERROR", message: s, parserError: t },
                  t.pos
                );
            }
          })(this, this.graph.acornParser, this.graph.acornOptions)),
        (c = this.comments),
        zn(this.esTreeAst, { commentIndex: 0, commentNodes: c.filter(qn) }),
        oi("generate ast", 3),
        (this.resolvedIds = a || Object.create(null));
      const u = this.id;
      (this.magicString = new x(t, {
        filename: this.excludeFromSourcemap ? null : u,
        indentExclusionRanges: [],
      })),
        this.removeExistingSourceMap(),
        ai("analyse ast", 3),
        (this.astContext = {
          addDynamicImport: this.addDynamicImport.bind(this),
          addExport: this.addExport.bind(this),
          addImport: this.addImport.bind(this),
          addImportMeta: this.addImportMeta.bind(this),
          annotations:
            this.graph.treeshakingOptions &&
            this.graph.treeshakingOptions.annotations,
          code: t,
          deoptimizationTracker: this.graph.deoptimizationTracker,
          error: this.error.bind(this),
          fileName: u,
          getExports: this.getExports.bind(this),
          getModuleExecIndex: () => this.execIndex,
          getModuleName: this.basename.bind(this),
          getReexports: this.getReexports.bind(this),
          importDescriptions: this.importDescriptions,
          includeDynamicImport: this.includeDynamicImport.bind(this),
          includeVariable: this.includeVariable.bind(this),
          isCrossChunkImport: (e) => e.module.chunk !== this.chunk,
          magicString: this.magicString,
          module: this,
          moduleContext: this.context,
          nodeConstructors: Fn,
          preserveModules: this.graph.preserveModules,
          propertyReadSideEffects:
            !this.graph.treeshakingOptions ||
            this.graph.treeshakingOptions.propertyReadSideEffects,
          traceExport: this.getVariableForExportName.bind(this),
          traceVariable: this.traceVariable.bind(this),
          treeshake: !!this.graph.treeshakingOptions,
          tryCatchDeoptimization:
            !this.graph.treeshakingOptions ||
            this.graph.treeshakingOptions.tryCatchDeoptimization,
          unknownGlobalSideEffects:
            !this.graph.treeshakingOptions ||
            this.graph.treeshakingOptions.unknownGlobalSideEffects,
          usesTopLevelAwait: !1,
          warn: this.warn.bind(this),
          warnDeprecation: this.graph.warnDeprecation.bind(this.graph),
        }),
        (this.scope = new On(this.graph.scope, this.astContext)),
        (this.ast = new Tn(
          this.esTreeAst,
          { type: "Module", context: this.astContext },
          this.scope
        )),
        oi("analyse ast", 3);
    }
    toJSON() {
      return {
        ast: this.esTreeAst,
        code: this.code,
        customTransformCache: this.customTransformCache,
        dependencies: this.dependencies.map((e) => e.id),
        id: this.id,
        moduleSideEffects: this.moduleSideEffects,
        originalCode: this.originalCode,
        originalSourcemap: this.originalSourcemap,
        resolvedIds: this.resolvedIds,
        sourcemapChain: this.sourcemapChain,
        transformDependencies: this.transformDependencies,
        transformFiles: this.transformFiles,
      };
    }
    traceVariable(e) {
      const t = this.scope.variables.get(e);
      if (t) return t;
      if (e in this.importDescriptions) {
        const t = this.importDescriptions[e],
          s = t.module;
        if (s instanceof fi && "*" === t.name) return s.getOrCreateNamespace();
        const n = s.getVariableForExportName(t.name);
        return n || di(t.name, this, s.id, t.start), n;
      }
      return null;
    }
    warn(e, t) {
      if (void 0 !== t) {
        e.pos = t;
        const { line: s, column: n } = $t(this.code, t, { offsetLine: 1 });
        (e.loc = { file: this.id, line: s, column: n }),
          (e.frame = Ss(this.code, s, n));
      }
      (e.id = this.id), this.graph.warn(e);
    }
    addDynamicImport(e) {
      this.dynamicImports.push({ node: e, resolution: null });
    }
    addExport(e) {
      if (e instanceof rs)
        this.exports.default = {
          identifier: e.variable.getAssignedVariableName(),
          localName: "default",
        };
      else if (e instanceof Xs) {
        const t = e.source.value;
        this.sources.add(t), this.exportAllSources.add(t);
      } else if (e.source instanceof ln) {
        const t = e.source.value;
        this.sources.add(t);
        for (const s of e.specifiers) {
          const e = s.exported.name;
          this.reexportDescriptions[e] = {
            localName: s.type === le ? "*" : s.local.name,
            module: null,
            source: t,
            start: s.start,
          };
        }
      } else if (e.declaration) {
        const t = e.declaration;
        if (t instanceof Bn)
          for (const e of t.declarations)
            for (const t of Ys(e.id))
              this.exports[t] = { identifier: null, localName: t };
        else {
          const e = t.id.name;
          this.exports[e] = { identifier: null, localName: e };
        }
      } else
        for (const t of e.specifiers) {
          const e = t.local.name,
            s = t.exported.name;
          this.exports[s] = { identifier: null, localName: e };
        }
    }
    addImport(e) {
      const t = e.source.value;
      this.sources.add(t);
      for (const s of e.specifiers) {
        const e = s.local.name;
        this.importDescriptions[e] &&
          this.error(
            { code: "DUPLICATE_IMPORT", message: `Duplicated import '${e}'` },
            s.start
          );
        const n = s.type === pe,
          i = s.type === fe,
          r = n ? "default" : i ? "*" : s.imported.name;
        this.importDescriptions[e] = {
          source: t,
          start: s.start,
          name: r,
          module: null,
        };
      }
    }
    addImportMeta(e) {
      this.importMetas.push(e);
    }
    addModulesToImportDescriptions(e) {
      for (const t of Object.keys(e)) {
        const s = e[t],
          n = this.resolvedIds[s.source].id;
        s.module = this.graph.moduleById.get(n);
      }
    }
    includeDynamicImport(e) {
      const t = this.dynamicImports.find((t) => t.node === e).resolution;
      t instanceof fi &&
        (t.dynamicallyImportedBy.push(this), t.includeAllExports());
    }
    includeVariable(e, t) {
      const s = t.module;
      t.included || (t.include(e), (this.graph.needsTreeshakingPass = !0)),
        s && s !== this && this.imports.add(t);
    }
    removeExistingSourceMap() {
      for (const e of this.comments)
        !e.block && Yn.test(e.text) && this.magicString.remove(e.start, e.end);
    }
    shimMissingExport(e) {
      this.exports[e] ||
        (this.graph.warn({
          code: "SHIMMED_EXPORT",
          exporter: ks(this.id),
          exportName: e,
          message: `Missing export "${e}" has been shimmed in module ${ks(
            this.id
          )}.`,
        }),
        (this.exports[e] = pi));
    }
  }
  class mi {
    constructor(e, t) {
      (this.isOriginal = !0), (this.filename = e), (this.content = t);
    }
    traceSegment(e, t, s) {
      return { line: e, column: t, name: s, source: this };
    }
  }
  class gi {
    constructor(e, t) {
      (this.sources = t), (this.names = e.names), (this.mappings = e.mappings);
    }
    traceMappings() {
      const e = [],
        t = [],
        s = [],
        n = [];
      for (const i of this.mappings) {
        const r = [];
        for (const n of i) {
          if (1 == n.length) continue;
          const i = this.sources[n[1]];
          if (!i) continue;
          const a = i.traceSegment(
            n[2],
            n[3],
            5 === n.length ? this.names[n[4]] : ""
          );
          if (a) {
            let i = e.lastIndexOf(a.source.filename);
            -1 === i
              ? ((i = e.length),
                e.push(a.source.filename),
                (t[i] = a.source.content))
              : null == t[i]
              ? (t[i] = a.source.content)
              : null != a.source.content &&
                t[i] !== a.source.content &&
                ws({
                  message: `Multiple conflicting contents for sourcemap source ${a.source.filename}`,
                });
            const o = [n[0], i, a.line, a.column];
            if (a.name) {
              let e = s.indexOf(a.name);
              -1 === e && ((e = s.length), s.push(a.name)), (o[4] = e);
            }
            r.push(o);
          }
        }
        n.push(r);
      }
      return { sources: e, sourcesContent: t, names: s, mappings: n };
    }
    traceSegment(e, t, s) {
      const n = this.mappings[e];
      if (!n) return null;
      let i = 0,
        r = n.length - 1;
      for (; i <= r; ) {
        const e = (i + r) >> 1,
          a = n[e];
        if (a[0] === t) {
          if (1 == a.length) return null;
          const e = this.sources[a[1]];
          return e
            ? e.traceSegment(a[2], a[3], 5 === a.length ? this.names[a[4]] : s)
            : null;
        }
        a[0] > t ? (r = e - 1) : (i = e + 1);
      }
      return null;
    }
  }
  function xi(e) {
    return function(t, s) {
      return s.mappings
        ? new gi(s, [t])
        : (e.warn({
            code: "SOURCEMAP_BROKEN",
            message: `Sourcemap is likely to be incorrect: a plugin${
              s.plugin ? ` ('${s.plugin}')` : ""
            } was used to transform files, but didn't generate a sourcemap for the transformation. Consult the plugin documentation for help`,
            plugin: s.plugin,
            url:
              "https://rollupjs.org/guide/en/#warning-sourcemap-is-likely-to-be-incorrect",
          }),
          new gi({ mappings: [], names: [] }, [t]));
    };
  }
  function yi(e, t, s, n, i) {
    let r;
    if (s) {
      const t = s.sources,
        n = s.sourcesContent || [],
        i = bt(e) || ".",
        a = s.sourceRoot || ".",
        o = t.map((e, t) => new mi(At(i, a, e), n[t]));
      r = new gi(s, o);
    } else r = new mi(e, t);
    return n.reduce(i, r);
  }
  const Ei = { amd: Si, cjs: Si, es: vi, iife: Si, system: vi, umd: Si };
  function bi(e, t, s, n, i, r, a) {
    !(function(e, t, s) {
      for (const n of t) {
        const t = n.scope;
        for (const [s, n] of t.accessedOutsideVariables) n.included && e.add(s);
        const i =
          t.accessedGlobalVariablesByFormat &&
          t.accessedGlobalVariablesByFormat.get(s);
        if (i) for (const t of i) e.add(t);
      }
    })(n, e, i),
      (function(e, t) {
        for (const s of t) {
          for (const t of s.scope.variables.values())
            t.included &&
              !(
                t.renderBaseName ||
                (t instanceof as && t.getOriginalVariable() !== t)
              ) &&
              t.setRenderNames(null, $e(t.name, e));
          const t = s.getOrCreateNamespace();
          t.included && t.setRenderNames(null, $e(t.name, e));
        }
      })(n, e),
      Ei[i](n, s, t, r, a);
    for (const t of e) t.scope.deconflict(i);
  }
  function vi(e, t, s, n) {
    for (const s of t) {
      const t = s.module,
        i = s.name;
      let r;
      (r =
        t instanceof Ct && ("*" === i || "default" === i)
          ? "default" === i && n && t.exportsNamespace
            ? t.variableName + "__default"
            : t.variableName
          : i),
        s.setRenderNames(null, $e(r, e));
    }
  }
  function Si(e, t, s, n, i) {
    for (const t of s) t.variableName = $e(t.variableName, e);
    for (const e of t) {
      const t = e.module;
      if (t instanceof Ct) {
        const s = e.name;
        "default" === s && n && (t.exportsNamespace || t.exportsNames)
          ? e.setRenderNames(null, t.variableName + "__default")
          : "*" === s || "default" === s
          ? e.setRenderNames(null, t.variableName)
          : e.setRenderNames(t.variableName, null);
      } else {
        const s = t.chunk;
        "default" === s.exportMode || (i && e.isNamespace)
          ? e.setRenderNames(null, s.variableName)
          : e.setRenderNames(s.variableName, s.getVariableExportName(e));
      }
    }
  }
  const Ai = (e, t) => (e.execIndex > t.execIndex ? 1 : -1);
  function Ci(e) {
    e.sort(Ai);
  }
  function ki(e, t, s) {
    const n = [ks(e)];
    let i = t;
    for (; i !== e && (n.push(ks(i)), (i = s[i])); );
    return n.push(n[0]), n.reverse(), n;
  }
  function Pi(e) {
    const t = e.split("\n"),
      s = t.filter((e) => /^\t+/.test(e)),
      n = t.filter((e) => /^ {2,}/.test(e));
    if (0 === s.length && 0 === n.length) return null;
    if (s.length >= n.length) return "\t";
    const i = n.reduce((e, t) => {
      const s = /^ +/.exec(t)[0].length;
      return Math.min(s, e);
    }, 1 / 0);
    return new Array(i + 1).join(" ");
  }
  function wi(e) {
    if (!e) return null;
    if (("string" == typeof e && (e = JSON.parse(e)), "" === e.mappings))
      return { mappings: [], names: [], sources: [], version: 3 };
    let t;
    return (
      (t =
        "string" == typeof e.mappings
          ? (function(e) {
              for (
                var t = 0,
                  n = 0,
                  i = 0,
                  r = 0,
                  a = 0,
                  o = [],
                  h = [],
                  l = [],
                  c = 0,
                  u = 0,
                  d = 0,
                  p = 0,
                  f = e.length;
                c < f;
                c++
              ) {
                var m = e.charCodeAt(c);
                if (44 === m) l.length && h.push(l), (l = []), (u = 0);
                else if (59 === m)
                  l.length && h.push(l),
                    (l = []),
                    (u = 0),
                    o.push(h),
                    (h = []),
                    (t = 0);
                else {
                  var g = s[m];
                  if (void 0 === g)
                    throw new Error(
                      "Invalid character (" + String.fromCharCode(m) + ")"
                    );
                  var x = 32 & g;
                  if (((p += (g &= 31) << d), x)) d += 5;
                  else {
                    var y = 1 & p;
                    (p >>>= 1),
                      y && 0 === (p = -p) && (p = -2147483648),
                      0 == u
                        ? ((t += p), l.push(t))
                        : 1 === u
                        ? ((n += p), l.push(n))
                        : 2 === u
                        ? ((i += p), l.push(i))
                        : 3 === u
                        ? ((r += p), l.push(r))
                        : 4 === u && ((a += p), l.push(a)),
                      u++,
                      (p = d = 0);
                  }
                }
              }
              return l.length && h.push(l), o.push(h), o;
            })(e.mappings)
          : e.mappings),
      Object.assign(Object.assign({}, e), { mappings: t })
    );
  }
  function Ii(e, t, s) {
    return Ps(e)
      ? e.replace(/\[(\w+)\]/g, (e, n) => {
          if (!s.hasOwnProperty(n))
            return ws(
              Ts(`"[${n}]" is not a valid placeholder in "${t}" pattern.`)
            );
          const i = s[n]();
          return Ps(i)
            ? i
            : ws(
                Ts(
                  `Invalid substitution "${i}" for placeholder "[${n}]" in "${t}" pattern, can be neither absolute nor relative path.`
                )
              );
        })
      : ws(
          Ts(
            `Invalid pattern "${e}" for "${t}", patterns can be neither absolute nor relative paths and must not contain invalid characters.`
          )
        );
  }
  function Ni(e, t) {
    if (e in t == !1) return e;
    const s = vt(e);
    e = e.substr(0, e.length - s.length);
    let n,
      i = 1;
    for (; t[(n = e + ++i + s)]; );
    return n;
  }
  const $i = [".js", ".jsx", ".ts", ".tsx"];
  function _i(e, t, s, n) {
    let i;
    return (
      "function" == typeof t ? (i = t(e.id)) : t && (i = t[e.id]),
      i ||
        (n
          ? (s.warn({
              code: "MISSING_GLOBAL_NAME",
              guess: e.variableName,
              message: `No name was provided for external module '${e.id}' in output.globals – guessing '${e.variableName}'`,
              source: e.id,
            }),
            e.variableName)
          : void 0)
    );
  }
  function Li(e) {
    return (
      !e.isEmpty || e.entryModules.length > 0 || null !== e.manualChunkAlias
    );
  }
  class Ti {
    constructor(e, t) {
      (this.entryModules = []),
        (this.exportMode = "named"),
        (this.facadeModule = null),
        (this.id = null),
        (this.indentString = void 0),
        (this.manualChunkAlias = null),
        (this.usedModules = void 0),
        (this.variableName = "chunk"),
        (this.dependencies = void 0),
        (this.dynamicDependencies = void 0),
        (this.exportNames = Object.create(null)),
        (this.exports = new Set()),
        (this.fileName = null),
        (this.imports = new Set()),
        (this.name = null),
        (this.needsExportsShim = !1),
        (this.renderedDeclarations = void 0),
        (this.renderedHash = void 0),
        (this.renderedModuleSources = new Map()),
        (this.renderedSource = null),
        (this.renderedSourceLength = void 0),
        (this.sortedExportNames = null),
        (this.graph = e),
        (this.orderedModules = t),
        (this.execIndex = t.length > 0 ? t[0].execIndex : 1 / 0),
        (this.isEmpty = !0);
      for (const e of t)
        this.isEmpty && e.isIncluded() && (this.isEmpty = !1),
          e.manualChunkAlias && (this.manualChunkAlias = e.manualChunkAlias),
          (e.chunk = this),
          (e.isEntryPoint ||
            e.dynamicallyImportedBy.some((e) => -1 === t.indexOf(e))) &&
            this.entryModules.push(e);
      const s =
        this.entryModules[0] ||
        this.orderedModules[this.orderedModules.length - 1];
      s &&
        (this.variableName = pt(
          Et(s.chunkName || s.manualChunkAlias || Cs(s.id))
        ));
    }
    static generateFacade(e, t, s) {
      const n = new Ti(e, []);
      n.assignFacadeName(s, t),
        t.facadeChunk || (t.facadeChunk = n),
        (n.dependencies = [t.chunk]),
        (n.dynamicDependencies = []),
        (n.facadeModule = t);
      for (const e of t.getAllExportNames()) {
        const s = t.getVariableForExportName(e);
        n.exports.add(s), (n.exportNames[e] = s);
      }
      return n;
    }
    canModuleBeFacade(e) {
      for (const t of this.exports) if (!e.has(t)) return !1;
      return !0;
    }
    generateFacades() {
      const e = [];
      for (const t of this.entryModules) {
        const s = Array.from(t.userChunkNames).map((e) => ({ name: e }));
        if (
          (0 === s.length && t.isUserDefinedEntryPoint && s.push({}),
          s.push(...Array.from(t.chunkFileNames).map((e) => ({ fileName: e }))),
          0 === s.length && s.push({}),
          !this.facadeModule)
        ) {
          const e = t.getExportNamesByVariable();
          if (this.graph.preserveModules || this.canModuleBeFacade(e)) {
            (this.facadeModule = t), (t.facadeChunk = this);
            for (const [t, s] of e) for (const e of s) this.exportNames[e] = t;
            this.assignFacadeName(s.shift(), t);
          }
        }
        for (const n of s) e.push(Ti.generateFacade(this.graph, t, n));
      }
      return e;
    }
    generateId(e, t, s, n, i) {
      if (null !== this.fileName) return this.fileName;
      const [r, a] =
        this.facadeModule && this.facadeModule.isUserDefinedEntryPoint
          ? [t.entryFileNames || "[name].js", "output.entryFileNames"]
          : [t.chunkFileNames || "[name]-[hash].js", "output.chunkFileNames"];
      return Ni(
        Ii(r, a, {
          format: () => ("es" === t.format ? "esm" : t.format),
          hash: () =>
            n ? this.computeContentHashWithDependencies(e, t, s, i) : "[hash]",
          name: () => this.getChunkName(),
        }),
        s
      );
    }
    generateIdPreserveModules(e, t, s) {
      const n = this.orderedModules[0].id,
        i = As(n);
      let r;
      if (gt(n)) {
        const s = vt(n),
          a = Ii(
            t.entryFileNames ||
              ($i.includes(s) ? "[name].js" : "[name][extname].js"),
            "output.entryFileNames",
            {
              ext: () => s.substr(1),
              extname: () => s,
              format: () => ("es" === t.format ? "esm" : t.format),
              name: () => this.getChunkName(),
            }
          );
        r = Y(e, `${bt(i)}/${a}`);
      } else r = `_virtual/${Et(i)}`;
      return Ni(yt(r), s);
    }
    generateInternalExports(e) {
      if (null !== this.facadeModule) return;
      const t = "system" === e.format || "es" === e.format || e.compact;
      let s,
        n = 0;
      if (
        ((this.exportNames = Object.create(null)),
        (this.sortedExportNames = null),
        t)
      )
        for (const e of this.exports) {
          const t = e.name[0];
          if (this.exportNames[t]) {
            do {
              49 === (s = Ie(++n)).charCodeAt(0) &&
                (s = Ie((n += 9 * Math.pow(64, s.length - 1))));
            } while (Ne[s] || this.exportNames[s]);
            this.exportNames[s] = e;
          } else this.exportNames[t] = e;
        }
      else
        for (const e of this.exports) {
          for (n = 0, s = e.name; this.exportNames[s]; ) s = e.name + "$" + ++n;
          this.exportNames[s] = e;
        }
    }
    getChunkName() {
      return this.name || (this.name = As(this.getFallbackChunkName()));
    }
    getDynamicImportIds() {
      return this.dynamicDependencies.map((e) => e.id).filter(Boolean);
    }
    getExportNames() {
      return (
        this.sortedExportNames ||
        (this.sortedExportNames = Object.keys(this.exportNames).sort())
      );
    }
    getImportIds() {
      return this.dependencies.map((e) => e.id).filter(Boolean);
    }
    getRenderedHash(e) {
      if (this.renderedHash) return this.renderedHash;
      if (!this.renderedSource) return "";
      const t = K(),
        s = this.calculateHashAugmentation(e);
      return (
        t.update(s),
        t.update(this.renderedSource.toString()),
        t.update(
          this.getExportNames()
            .map((e) => {
              const t = this.exportNames[e];
              return `${ks(t.module.id).replace(/\\/g, "/")}:${t.name}:${e}`;
            })
            .join(",")
        ),
        (this.renderedHash = t.digest("hex"))
      );
    }
    getRenderedSourceLength() {
      return void 0 !== this.renderedSourceLength
        ? this.renderedSourceLength
        : (this.renderedSourceLength = this.renderedSource.length());
    }
    getVariableExportName(e) {
      if (this.graph.preserveModules && e instanceof us) return "*";
      for (const t of Object.keys(this.exportNames))
        if (this.exportNames[t] === e) return t;
      throw new Error(
        `Internal Error: Could not find export name for variable ${e.name}.`
      );
    }
    link() {
      const e = new Set(),
        t = new Set();
      for (const s of this.orderedModules)
        this.addDependenciesToChunk(s.getTransitiveDependencies(), e),
          this.addDependenciesToChunk(s.dynamicDependencies, t),
          this.setUpChunkImportsAndExportsForModule(s);
      (this.dependencies = Array.from(e)),
        (this.dynamicDependencies = Array.from(t));
    }
    merge(e, t, s, n) {
      if (null !== this.facadeModule || null !== e.facadeModule)
        throw new Error(
          "Internal error: Code splitting chunk merges not supported for facades"
        );
      for (const t of e.orderedModules)
        (t.chunk = this), this.orderedModules.push(t);
      for (const t of e.imports)
        this.imports.has(t) || t.module.chunk === this || this.imports.add(t);
      for (const t of e.exports) this.exports.has(t) || this.exports.add(t);
      const i = this.exportNames;
      this.generateInternalExports(s);
      const r = (e, t) => {
          if (e.imports)
            for (const s of e.imports)
              s.imported = this.getVariableExportName(t[s.imported]);
          if (e.reexports)
            for (const s of e.reexports)
              s.imported = this.getVariableExportName(t[s.imported]);
        },
        a = (e, t) => {
          t.imports &&
            (e.imports
              ? (e.imports = e.imports.concat(t.imports))
              : (e.imports = t.imports)),
            t.reexports &&
              (e.reexports
                ? (e.reexports = e.reexports.concat(t.reexports))
                : (e.reexports = t.reexports)),
            !e.exportsNames && t.exportsNames && (e.exportsNames = !0),
            !e.exportsDefault && t.exportsDefault && (e.exportsDefault = !0),
            (e.name = this.variableName);
        };
      for (const s of t) {
        let t = void 0;
        for (let n = 0; n < s.dependencies.length; n++) {
          const o = s.dependencies[n];
          if ((o !== e && o !== this) || !t)
            o === e
              ? ((s.dependencies[n] = this),
                r((t = s.renderedDeclarations.dependencies[n]), e.exportNames))
              : o === this &&
                r((t = s.renderedDeclarations.dependencies[n]), i);
          else {
            const h = s.renderedDeclarations.dependencies[n];
            r(h, o === e ? e.exportNames : i),
              a(t, h),
              s.renderedDeclarations.dependencies.splice(n, 1),
              s.dependencies.splice(n--, 1);
          }
        }
      }
      this.preRender(s, n);
    }
    preRender(e, t) {
      ai("render modules", 3);
      const s = new E({ separator: e.compact ? "" : "\n\n" });
      (this.usedModules = []),
        (this.indentString = e.compact
          ? ""
          : (function(e, t) {
              if (!0 !== t.indent) return t.indent || "";
              for (let t = 0; t < e.length; t++) {
                const s = Pi(e[t].originalCode);
                if (null !== s) return s;
              }
              return "\t";
            })(this.orderedModules, e));
      const n = e.compact ? "" : "\n",
        i = e.compact ? "" : " ",
        r = {
          compact: e.compact,
          dynamicImportFunction: e.dynamicImportFunction,
          format: e.format,
          freeze: !1 !== e.freeze,
          indent: this.indentString,
          namespaceToStringTag: !0 === e.namespaceToStringTag,
          varOrConst: e.preferConst ? "const" : "var",
        };
      for (const { module: e } of this.imports) {
        const t = e instanceof fi ? e.chunk : e;
        -1 === this.dependencies.indexOf(t) && this.dependencies.push(t);
      }
      if (!this.graph.preserveModules && null !== this.facadeModule)
        for (const e of this.dependencies)
          e instanceof Ti && this.inlineChunkDependencies(e, !0);
      for (let e = 0; e < this.dependencies.length; e++) {
        const t = this.dependencies[e];
        t instanceof Ti &&
          t.isEmpty &&
          (this.dependencies.splice(e--, 1),
          this.inlineChunkDependencies(t, !1));
      }
      Ci(this.dependencies),
        this.prepareDynamicImports(),
        this.setIdentifierRenderResolutions(e);
      let a = "";
      const o = (this.renderedModules = Object.create(null));
      for (const t of this.orderedModules) {
        let i = 0;
        if (t.isIncluded()) {
          const o = t.render(r).trim();
          e.compact && -1 !== o.lastLine().indexOf("//") && o.append("\n");
          const h = t.getOrCreateNamespace();
          if (
            (h.included || o.length() > 0) &&
            ((i = o.length()),
            this.renderedModuleSources.set(t, o),
            s.addSource(o),
            this.usedModules.push(t),
            h.included && !this.graph.preserveModules)
          ) {
            const e = h.renderBlock(r);
            h.renderFirst() ? (a += n + e) : s.addSource(new x(e));
          }
        }
        const {
          renderedExports: h,
          removedExports: l,
        } = t.getRenderedExports();
        o[t.id] = {
          originalLength: t.originalCode.length,
          removedExports: l,
          renderedExports: h,
          renderedLength: i,
        };
      }
      a && s.prepend(a + n + n),
        this.needsExportsShim &&
          s.prepend(`${n}${r.varOrConst} ${os}${i}=${i}void 0;${n}${n}`),
        e.compact
          ? (this.renderedSource = s)
          : (this.renderedSource = s.trim()),
        (this.renderedSourceLength = void 0),
        (this.renderedHash = void 0),
        0 === this.getExportNames().length &&
          0 === this.getImportIds().length &&
          this.isEmpty &&
          this.graph.warn({
            code: "EMPTY_BUNDLE",
            message: "Generated an empty bundle",
          }),
        this.setExternalRenderPaths(e, t),
        (this.renderedDeclarations = {
          dependencies: this.getChunkDependencyDeclarations(e),
          exports:
            "none" === this.exportMode ? [] : this.getChunkExportDeclarations(),
        }),
        oi("render modules", 3);
    }
    render(e, t, s, n) {
      ai("render format", 3);
      const i = e.format,
        r = qs[i];
      e.dynamicImportFunction &&
        "es" !== i &&
        this.graph.warn({
          code: "INVALID_OPTION",
          message:
            '"output.dynamicImportFunction" is ignored for formats other than "esm".',
        });
      for (let e = 0; e < this.dependencies.length; e++) {
        const t = this.dependencies[e];
        if (t instanceof Ct && !t.renormalizeRenderPath) continue;
        const s = this.renderedDeclarations.dependencies[e],
          n = t instanceof Ct ? s.id : t.id;
        t instanceof Ti && (s.namedExportsMode = "default" !== t.exportMode),
          (s.id = this.getRelativePath(n));
      }
      this.finaliseDynamicImports(i), this.finaliseImportMetas(i, n);
      const a =
        0 !== this.renderedDeclarations.exports.length ||
        this.renderedDeclarations.dependencies.some(
          (e) => e.reexports && 0 !== e.reexports.length
        );
      let o = !1;
      const l = new Set();
      for (const e of this.orderedModules) {
        e.usesTopLevelAwait && (o = !0);
        const t = e.scope.accessedGlobalVariablesByFormat,
          s = t && t.get(i);
        if (s) for (const e of s) l.add(e);
      }
      o &&
        "es" !== i &&
        "system" !== i &&
        ws({
          code: "INVALID_TLA_FORMAT",
          message: `Module format ${i} does not support top-level await. Use the "es" or "system" output formats rather.`,
        });
      const c = r(
        this.renderedSource,
        {
          accessedGlobals: l,
          dependencies: this.renderedDeclarations.dependencies,
          exports: this.renderedDeclarations.exports,
          hasExports: a,
          indentString: this.indentString,
          intro: t.intro,
          isEntryModuleFacade:
            null !== this.facadeModule && this.facadeModule.isEntryPoint,
          namedExportsMode: "default" !== this.exportMode,
          outro: t.outro,
          usesTopLevelAwait: o,
          varOrConst: e.preferConst ? "const" : "var",
          warn: this.graph.warn.bind(this.graph),
        },
        e
      );
      t.banner && c.prepend(t.banner), t.footer && c.append(t.footer);
      const u = c.toString();
      oi("render format", 3);
      let d = null;
      const p = [];
      return (function({
        chunk: e,
        code: t,
        options: s,
        outputPluginDriver: n,
        renderChunk: i,
        sourcemapChain: r,
      }) {
        const a = (e, t, s) => {
          if (null == t) return e;
          if (
            ("string" == typeof t && (t = { code: t, map: void 0 }),
            null !== t.map)
          ) {
            const e = wi(t.map);
            r.push(e || { missing: !0, plugin: s.name });
          }
          return t.code;
        };
        let o = !1,
          h = !0;
        return n
          .hookReduceArg0("renderChunk", [t, i, s], a)
          .then(
            (t) => ((h = !1), n.hookReduceArg0("transformChunk", [t, s, e], a))
          )
          .then(
            (t) => ((o = !0), n.hookReduceArg0("transformBundle", [t, s, e], a))
          )
          .catch((e) => {
            if (h) throw e;
            return ws(e, {
              code: o ? "BAD_BUNDLE_TRANSFORMER" : "BAD_CHUNK_TRANSFORMER",
              message: `Error transforming ${(o ? "bundle" : "chunk") +
                (e.plugin ? ` with '${e.plugin}' plugin` : "")}: ${e.message}`,
              plugin: e.plugin,
            });
          });
      })({
        chunk: this,
        code: u,
        options: e,
        outputPluginDriver: n,
        renderChunk: s,
        sourcemapChain: p,
      }).then((t) => {
        if (e.sourcemap) {
          let t;
          ai("sourcemap", 3),
            (t = e.file
              ? At(e.sourcemapFile || e.file)
              : e.dir
              ? At(e.dir, this.id)
              : At(this.id));
          const s = c.generateDecodedMap({});
          ((d = (function(e, t, s, n, i, r) {
            const a = xi(e.graph),
              o = n
                .filter((e) => !e.excludeFromSourcemap)
                .map((e) =>
                  yi(
                    e.id,
                    e.originalCode,
                    e.originalSourcemap,
                    e.sourcemapChain,
                    a
                  )
                );
            let l = new gi(s, o);
            l = i.reduce(a, l);
            let {
              sources: c,
              sourcesContent: u,
              names: d,
              mappings: p,
            } = l.traceMappings();
            if (t) {
              const e = bt(t);
              (c = c.map((t) => St(e, t))), (t = Et(t));
            }
            return new h({
              file: t,
              sources: c,
              sourcesContent: (u = r ? null : u),
              names: d,
              mappings: p,
            });
          })(
            this,
            t,
            s,
            this.usedModules,
            p,
            e.sourcemapExcludeSources
          )).sources = d.sources.map((t) =>
            yt(e.sourcemapPathTransform ? e.sourcemapPathTransform(t) : t)
          )),
            oi("sourcemap", 3);
        }
        return (
          !0 !== e.compact && "\n" !== t[t.length - 1] && (t += "\n"),
          { code: t, map: d }
        );
      });
    }
    visitDependencies(e) {
      const t = [this],
        s = new Set();
      for (const n of t)
        if ((e(n), !(n instanceof Ct)))
          for (const e of n.dependencies.concat(n.dynamicDependencies))
            s.has(e) || (s.add(e), t.push(e));
    }
    visitStaticDependenciesUntilCondition(e) {
      const t = new Set();
      return (function s(n) {
        if (!t.has(n)) {
          if ((t.add(n), n instanceof Ti))
            for (const e of n.dependencies) if (s(e)) return !0;
          return !0 === e(n);
        }
      })(this);
    }
    addDependenciesToChunk(e, t) {
      for (const s of e) {
        if (s.chunk === this) continue;
        let e;
        if (s instanceof fi) e = s.chunk;
        else {
          if (!s.used && !s.moduleSideEffects) continue;
          e = s;
        }
        t.add(e);
      }
    }
    assignFacadeName({ fileName: e, name: t }, s) {
      e ? (this.fileName = e) : (this.name = As(t || s.chunkName || Cs(s.id)));
    }
    calculateHashAugmentation(e) {
      const t = this.facadeModule,
        s = this.getChunkName.bind(this),
        n = {
          dynamicImports: this.getDynamicImportIds(),
          exports: this.getExportNames(),
          facadeModuleId: t && t.id,
          imports: this.getImportIds(),
          isDynamicEntry: null !== t && t.dynamicallyImportedBy.length > 0,
          isEntry: null !== t && t.isEntryPoint,
          modules: this.renderedModules,
          get name() {
            return s();
          },
        };
      return e.hookReduceValueSync(
        "augmentChunkHash",
        "",
        [n],
        (e, t) => (t && (e += t), e)
      );
    }
    computeContentHashWithDependencies(e, t, s, n) {
      const i = K();
      return (
        i.update(
          [e.intro, e.outro, e.banner, e.footer].map((e) => e || "").join(":")
        ),
        i.update(t.format),
        this.visitDependencies((r) => {
          r instanceof Ct
            ? i.update(":" + r.renderPath)
            : (i.update(r.getRenderedHash(n)),
              i.update(r.generateId(e, t, s, !1, n)));
        }),
        i.digest("hex").substr(0, 8)
      );
    }
    finaliseDynamicImports(e) {
      for (const [t, s] of this.renderedModuleSources)
        for (const { node: n, resolution: i } of t.dynamicImports)
          if (i)
            if (i instanceof fi) {
              if (i.chunk !== this && Li(i.chunk)) {
                const t = i.facadeChunk || i.chunk;
                n.renderFinalResolution(
                  s,
                  `'${this.getRelativePath(t.id)}'`,
                  e
                );
              }
            } else
              n.renderFinalResolution(
                s,
                i instanceof Ct
                  ? `'${
                      i.renormalizeRenderPath
                        ? this.getRelativePath(i.renderPath)
                        : i.id
                    }'`
                  : i,
                e
              );
    }
    finaliseImportMetas(e, t) {
      for (const [s, n] of this.renderedModuleSources)
        for (const i of s.importMetas) i.renderFinalMechanism(n, this.id, e, t);
    }
    getChunkDependencyDeclarations(e) {
      const t = new Map();
      for (let s of this.getExportNames()) {
        let n,
          i,
          r = !1;
        if ("*" === s[0])
          (r = !1 !== e.externalLiveBindings),
            (n = this.graph.moduleById.get(s.substr(1))),
            (i = s = "*");
        else {
          const t = this.exportNames[s],
            a = t.module;
          if (!a || a.chunk === this) continue;
          a instanceof fi
            ? ((i = (n = a.chunk).getVariableExportName(t)),
              (r = t.isReassigned))
            : ((n = a), (i = t.name), (r = !1 !== e.externalLiveBindings));
        }
        let a = t.get(n);
        a || t.set(n, (a = [])),
          a.push({ imported: i, reexported: s, needsLiveBinding: r });
      }
      const s = new Set(),
        n = [];
      for (const i of this.dependencies) {
        const r = [];
        for (const e of this.imports) {
          const t = e instanceof as ? e.getOriginalVariable() : e;
          (e.module instanceof fi ? e.module.chunk !== i : e.module !== i) ||
            s.has(t) ||
            (s.add(t),
            r.push({
              imported:
                e.module instanceof Ct
                  ? e.name
                  : e.module.chunk.getVariableExportName(e),
              local: e.getName(),
            }));
        }
        const a = t.get(i);
        let o,
          h,
          l = !0;
        i instanceof Ct
          ? ((o = i.exportsNames || i.exportsNamespace),
            (h = "default" in i.declarations))
          : ((o = !0), (h = !1), (l = "default" !== i.exportMode));
        let c = void 0,
          u = void 0;
        i instanceof Ct &&
          ((c = i.renderPath),
          ("umd" !== e.format && "iife" !== e.format) ||
            (u = _i(i, e.globals, this.graph, o || h))),
          n.push({
            exportsDefault: h,
            exportsNames: o,
            globalName: u,
            id: c,
            imports: r.length > 0 ? r : null,
            isChunk: i instanceof Ti,
            name: i.variableName,
            namedExportsMode: l,
            reexports: a,
          });
      }
      return n;
    }
    getChunkExportDeclarations() {
      const e = [];
      for (const t of this.getExportNames()) {
        if ("*" === t[0]) continue;
        const s = this.exportNames[t],
          n = s.module;
        if (n && n.chunk !== this) continue;
        let i = !1,
          r = !1;
        if (s instanceof wt) {
          s.init === Me && (r = !0);
          for (const e of s.declarations)
            if (
              e.parent instanceof ns ||
              (e instanceof rs && e.declaration instanceof ns)
            ) {
              i = !0;
              break;
            }
        } else s instanceof Zt && (i = !0);
        const a = s.getName();
        e.push({
          exported: "*" === t ? a : t,
          hoisted: i,
          local: a,
          uninitialized: r,
        });
      }
      return e;
    }
    getFallbackChunkName() {
      return this.manualChunkAlias
        ? this.manualChunkAlias
        : this.fileName
        ? Cs(this.fileName)
        : Cs(this.orderedModules[this.orderedModules.length - 1].id);
    }
    getRelativePath(e) {
      const t = yt(Y(bt(this.id), e));
      return t.startsWith("../") ? t : "./" + t;
    }
    inlineChunkDependencies(e, t) {
      for (const s of e.dependencies)
        if (s instanceof Ct)
          -1 === this.dependencies.indexOf(s) && this.dependencies.push(s);
        else {
          if (s === this || -1 !== this.dependencies.indexOf(s)) continue;
          s.isEmpty || this.dependencies.push(s),
            t && this.inlineChunkDependencies(s, !0);
        }
    }
    prepareDynamicImports() {
      for (const e of this.orderedModules)
        for (const { node: t, resolution: s } of e.dynamicImports)
          if (t.included)
            if (s instanceof fi)
              if (s.chunk === this) {
                const e = s.getOrCreateNamespace();
                t.setResolution("named", e);
              } else t.setResolution(s.chunk.exportMode);
            else t.setResolution("auto");
    }
    setExternalRenderPaths(e, t) {
      for (const s of this.dependencies.concat(this.dynamicDependencies))
        s instanceof Ct && s.setRenderPath(e, t);
    }
    setIdentifierRenderResolutions(e) {
      for (const t of this.getExportNames()) {
        const s = this.exportNames[t];
        s &&
          (s instanceof cs && (this.needsExportsShim = !0),
          (s.exportName = t),
          "es" === e.format ||
          "system" === e.format ||
          !s.isReassigned ||
          s.isId ||
          (s instanceof as && s.hasId)
            ? s.setRenderNames(null, null)
            : s.setRenderNames("exports", t));
      }
      const t = new Set();
      this.needsExportsShim && t.add(os),
        "es" !== e.format &&
          (t.add("exports"),
          "cjs" === e.format &&
            t
              .add(hs)
              .add("require")
              .add("module")
              .add("__filename")
              .add("__dirname")),
        bi(
          this.orderedModules,
          this.dependencies,
          this.imports,
          t,
          e.format,
          !1 !== e.interop,
          this.graph.preserveModules
        );
    }
    setUpChunkImportsAndExportsForModule(e) {
      for (const t of e.imports)
        t.module.chunk !== this &&
          (this.imports.add(t),
          t.module instanceof fi && t.module.chunk.exports.add(t));
      if (
        e.isEntryPoint ||
        e.dynamicallyImportedBy.some((e) => e.chunk !== this)
      ) {
        const t = e.getExportNamesByVariable();
        for (const e of t.keys()) {
          this.exports.add(e);
          const t = e.module;
          t && t.chunk && t.chunk !== this && t.chunk.exports.add(e);
        }
      }
      if (e.getOrCreateNamespace().included)
        for (const t of Object.keys(e.reexportDescriptions)) {
          const s = e.reexportDescriptions[t],
            n = s.module.getVariableForExportName(s.localName);
          n.module.chunk !== this &&
            (this.imports.add(n),
            n.module instanceof fi && n.module.chunk.exports.add(n));
        }
      const t = re();
      for (const { node: s, resolution: n } of e.dynamicImports)
        s.included &&
          n instanceof fi &&
          n.chunk === this &&
          n.getOrCreateNamespace().include(t);
    }
  }
  var Ri = {
      3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
      5: "class enum extends super const export import",
      6: "enum",
      strict:
        "implements interface let package private protected public static yield",
      strictBind: "eval arguments",
    },
    Mi =
      "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",
    Oi = {
      5: Mi,
      "5module": Mi + " export import",
      6: Mi + " const class extends export import super",
    },
    Di = /^in(stanceof)?$/,
    Vi =
      "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿯ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-Ᶎꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭧꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
    Bi =
      "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿",
    Fi = new RegExp("[" + Vi + "]"),
    Wi = new RegExp("[" + Vi + Bi + "]");
  Vi = Bi = null;
  var ji = [
      0,
      11,
      2,
      25,
      2,
      18,
      2,
      1,
      2,
      14,
      3,
      13,
      35,
      122,
      70,
      52,
      268,
      28,
      4,
      48,
      48,
      31,
      14,
      29,
      6,
      37,
      11,
      29,
      3,
      35,
      5,
      7,
      2,
      4,
      43,
      157,
      19,
      35,
      5,
      35,
      5,
      39,
      9,
      51,
      157,
      310,
      10,
      21,
      11,
      7,
      153,
      5,
      3,
      0,
      2,
      43,
      2,
      1,
      4,
      0,
      3,
      22,
      11,
      22,
      10,
      30,
      66,
      18,
      2,
      1,
      11,
      21,
      11,
      25,
      71,
      55,
      7,
      1,
      65,
      0,
      16,
      3,
      2,
      2,
      2,
      28,
      43,
      28,
      4,
      28,
      36,
      7,
      2,
      27,
      28,
      53,
      11,
      21,
      11,
      18,
      14,
      17,
      111,
      72,
      56,
      50,
      14,
      50,
      14,
      35,
      477,
      28,
      11,
      0,
      9,
      21,
      155,
      22,
      13,
      52,
      76,
      44,
      33,
      24,
      27,
      35,
      30,
      0,
      12,
      34,
      4,
      0,
      13,
      47,
      15,
      3,
      22,
      0,
      2,
      0,
      36,
      17,
      2,
      24,
      85,
      6,
      2,
      0,
      2,
      3,
      2,
      14,
      2,
      9,
      8,
      46,
      39,
      7,
      3,
      1,
      3,
      21,
      2,
      6,
      2,
      1,
      2,
      4,
      4,
      0,
      19,
      0,
      13,
      4,
      159,
      52,
      19,
      3,
      21,
      0,
      33,
      47,
      21,
      1,
      2,
      0,
      185,
      46,
      42,
      3,
      37,
      47,
      21,
      0,
      60,
      42,
      14,
      0,
      72,
      26,
      230,
      43,
      117,
      63,
      32,
      0,
      161,
      7,
      3,
      38,
      17,
      0,
      2,
      0,
      29,
      0,
      11,
      39,
      8,
      0,
      22,
      0,
      12,
      45,
      20,
      0,
      35,
      56,
      264,
      8,
      2,
      36,
      18,
      0,
      50,
      29,
      113,
      6,
      2,
      1,
      2,
      37,
      22,
      0,
      26,
      5,
      2,
      1,
      2,
      31,
      15,
      0,
      328,
      18,
      270,
      921,
      103,
      110,
      18,
      195,
      2749,
      1070,
      4050,
      582,
      8634,
      568,
      8,
      30,
      114,
      29,
      19,
      47,
      17,
      3,
      32,
      20,
      6,
      18,
      689,
      63,
      129,
      74,
      6,
      0,
      67,
      12,
      65,
      1,
      2,
      0,
      29,
      6135,
      9,
      754,
      9486,
      286,
      50,
      2,
      18,
      3,
      9,
      395,
      2309,
      106,
      6,
      12,
      4,
      8,
      8,
      9,
      5991,
      84,
      2,
      70,
      2,
      1,
      3,
      0,
      3,
      1,
      3,
      3,
      2,
      11,
      2,
      0,
      2,
      6,
      2,
      64,
      2,
      3,
      3,
      7,
      2,
      6,
      2,
      27,
      2,
      3,
      2,
      4,
      2,
      0,
      4,
      6,
      2,
      339,
      3,
      24,
      2,
      24,
      2,
      30,
      2,
      24,
      2,
      30,
      2,
      24,
      2,
      30,
      2,
      24,
      2,
      30,
      2,
      24,
      2,
      7,
      2357,
      44,
      11,
      6,
      17,
      0,
      370,
      43,
      1301,
      196,
      60,
      67,
      8,
      0,
      1205,
      3,
      2,
      26,
      2,
      1,
      2,
      0,
      3,
      0,
      2,
      9,
      2,
      3,
      2,
      0,
      2,
      0,
      7,
      0,
      5,
      0,
      2,
      0,
      2,
      0,
      2,
      2,
      2,
      1,
      2,
      0,
      3,
      0,
      2,
      0,
      2,
      0,
      2,
      0,
      2,
      0,
      2,
      1,
      2,
      0,
      3,
      3,
      2,
      6,
      2,
      3,
      2,
      3,
      2,
      0,
      2,
      9,
      2,
      16,
      6,
      2,
      2,
      4,
      2,
      16,
      4421,
      42710,
      42,
      4148,
      12,
      221,
      3,
      5761,
      15,
      7472,
      3104,
      541,
    ],
    Ui = [
      509,
      0,
      227,
      0,
      150,
      4,
      294,
      9,
      1368,
      2,
      2,
      1,
      6,
      3,
      41,
      2,
      5,
      0,
      166,
      1,
      574,
      3,
      9,
      9,
      525,
      10,
      176,
      2,
      54,
      14,
      32,
      9,
      16,
      3,
      46,
      10,
      54,
      9,
      7,
      2,
      37,
      13,
      2,
      9,
      6,
      1,
      45,
      0,
      13,
      2,
      49,
      13,
      9,
      3,
      4,
      9,
      83,
      11,
      7,
      0,
      161,
      11,
      6,
      9,
      7,
      3,
      56,
      1,
      2,
      6,
      3,
      1,
      3,
      2,
      10,
      0,
      11,
      1,
      3,
      6,
      4,
      4,
      193,
      17,
      10,
      9,
      5,
      0,
      82,
      19,
      13,
      9,
      214,
      6,
      3,
      8,
      28,
      1,
      83,
      16,
      16,
      9,
      82,
      12,
      9,
      9,
      84,
      14,
      5,
      9,
      243,
      14,
      166,
      9,
      232,
      6,
      3,
      6,
      4,
      0,
      29,
      9,
      41,
      6,
      2,
      3,
      9,
      0,
      10,
      10,
      47,
      15,
      406,
      7,
      2,
      7,
      17,
      9,
      57,
      21,
      2,
      13,
      123,
      5,
      4,
      0,
      2,
      1,
      2,
      6,
      2,
      0,
      9,
      9,
      49,
      4,
      2,
      1,
      2,
      4,
      9,
      9,
      330,
      3,
      19306,
      9,
      135,
      4,
      60,
      6,
      26,
      9,
      1014,
      0,
      2,
      54,
      8,
      3,
      19723,
      1,
      5319,
      4,
      4,
      5,
      9,
      7,
      3,
      6,
      31,
      3,
      149,
      2,
      1418,
      49,
      513,
      54,
      5,
      49,
      9,
      0,
      15,
      0,
      23,
      4,
      2,
      14,
      1361,
      6,
      2,
      16,
      3,
      6,
      2,
      1,
      2,
      4,
      262,
      6,
      10,
      9,
      419,
      13,
      1495,
      6,
      110,
      6,
      6,
      9,
      792487,
      239,
    ];
  function zi(e, t) {
    for (var s = 65536, n = 0; n < t.length; n += 2) {
      if ((s += t[n]) > e) return !1;
      if ((s += t[n + 1]) >= e) return !0;
    }
  }
  function Gi(e, t) {
    return e < 65
      ? 36 === e
      : e < 91 ||
          (e < 97
            ? 95 === e
            : e < 123 ||
              (e <= 65535
                ? e >= 170 && Fi.test(String.fromCharCode(e))
                : !1 !== t && zi(e, ji)));
  }
  function Hi(e, t) {
    return e < 48
      ? 36 === e
      : e < 58 ||
          (!(e < 65) &&
            (e < 91 ||
              (e < 97
                ? 95 === e
                : e < 123 ||
                  (e <= 65535
                    ? e >= 170 && Wi.test(String.fromCharCode(e))
                    : !1 !== t && (zi(e, ji) || zi(e, Ui))))));
  }
  var qi = function(e, t) {
    void 0 === t && (t = {}),
      (this.label = e),
      (this.keyword = t.keyword),
      (this.beforeExpr = !!t.beforeExpr),
      (this.startsExpr = !!t.startsExpr),
      (this.isLoop = !!t.isLoop),
      (this.isAssign = !!t.isAssign),
      (this.prefix = !!t.prefix),
      (this.postfix = !!t.postfix),
      (this.binop = t.binop || null),
      (this.updateContext = null);
  };
  function Ki(e, t) {
    return new qi(e, { beforeExpr: !0, binop: t });
  }
  var Yi = { beforeExpr: !0 },
    Xi = { startsExpr: !0 },
    Qi = {};
  function Ji(e, t) {
    return void 0 === t && (t = {}), (t.keyword = e), (Qi[e] = new qi(e, t));
  }
  var Zi = {
      num: new qi("num", Xi),
      regexp: new qi("regexp", Xi),
      string: new qi("string", Xi),
      name: new qi("name", Xi),
      eof: new qi("eof"),
      bracketL: new qi("[", { beforeExpr: !0, startsExpr: !0 }),
      bracketR: new qi("]"),
      braceL: new qi("{", { beforeExpr: !0, startsExpr: !0 }),
      braceR: new qi("}"),
      parenL: new qi("(", { beforeExpr: !0, startsExpr: !0 }),
      parenR: new qi(")"),
      comma: new qi(",", Yi),
      semi: new qi(";", Yi),
      colon: new qi(":", Yi),
      dot: new qi("."),
      question: new qi("?", Yi),
      arrow: new qi("=>", Yi),
      template: new qi("template"),
      invalidTemplate: new qi("invalidTemplate"),
      ellipsis: new qi("...", Yi),
      backQuote: new qi("`", Xi),
      dollarBraceL: new qi("${", { beforeExpr: !0, startsExpr: !0 }),
      eq: new qi("=", { beforeExpr: !0, isAssign: !0 }),
      assign: new qi("_=", { beforeExpr: !0, isAssign: !0 }),
      incDec: new qi("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
      prefix: new qi("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      logicalOR: Ki("||", 1),
      logicalAND: Ki("&&", 2),
      bitwiseOR: Ki("|", 3),
      bitwiseXOR: Ki("^", 4),
      bitwiseAND: Ki("&", 5),
      equality: Ki("==/!=/===/!==", 6),
      relational: Ki("</>/<=/>=", 7),
      bitShift: Ki("<</>>/>>>", 8),
      plusMin: new qi("+/-", {
        beforeExpr: !0,
        binop: 9,
        prefix: !0,
        startsExpr: !0,
      }),
      modulo: Ki("%", 10),
      star: Ki("*", 10),
      slash: Ki("/", 10),
      starstar: new qi("**", { beforeExpr: !0 }),
      _break: Ji("break"),
      _case: Ji("case", Yi),
      _catch: Ji("catch"),
      _continue: Ji("continue"),
      _debugger: Ji("debugger"),
      _default: Ji("default", Yi),
      _do: Ji("do", { isLoop: !0, beforeExpr: !0 }),
      _else: Ji("else", Yi),
      _finally: Ji("finally"),
      _for: Ji("for", { isLoop: !0 }),
      _function: Ji("function", Xi),
      _if: Ji("if"),
      _return: Ji("return", Yi),
      _switch: Ji("switch"),
      _throw: Ji("throw", Yi),
      _try: Ji("try"),
      _var: Ji("var"),
      _const: Ji("const"),
      _while: Ji("while", { isLoop: !0 }),
      _with: Ji("with"),
      _new: Ji("new", { beforeExpr: !0, startsExpr: !0 }),
      _this: Ji("this", Xi),
      _super: Ji("super", Xi),
      _class: Ji("class", Xi),
      _extends: Ji("extends", Yi),
      _export: Ji("export"),
      _import: Ji("import", Xi),
      _null: Ji("null", Xi),
      _true: Ji("true", Xi),
      _false: Ji("false", Xi),
      _in: Ji("in", { beforeExpr: !0, binop: 7 }),
      _instanceof: Ji("instanceof", { beforeExpr: !0, binop: 7 }),
      _typeof: Ji("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _void: Ji("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _delete: Ji("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
    },
    er = /\r\n?|\n|\u2028|\u2029/,
    tr = new RegExp(er.source, "g");
  function sr(e, t) {
    return 10 === e || 13 === e || (!t && (8232 === e || 8233 === e));
  }
  var nr = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
    ir = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
    rr = Object.prototype,
    ar = rr.hasOwnProperty,
    or = rr.toString;
  function hr(e, t) {
    return ar.call(e, t);
  }
  var lr =
    Array.isArray ||
    function(e) {
      return "[object Array]" === or.call(e);
    };
  function cr(e) {
    return new RegExp("^(?:" + e.replace(/ /g, "|") + ")$");
  }
  var ur = function(e, t) {
    (this.line = e), (this.column = t);
  };
  ur.prototype.offset = function(e) {
    return new ur(this.line, this.column + e);
  };
  var dr = function(e, t, s) {
    (this.start = t),
      (this.end = s),
      null !== e.sourceFile && (this.source = e.sourceFile);
  };
  function pr(e, t) {
    for (var s = 1, n = 0; ; ) {
      tr.lastIndex = n;
      var i = tr.exec(e);
      if (!(i && i.index < t)) return new ur(s, t - n);
      ++s, (n = i.index + i[0].length);
    }
  }
  var fr = {
    ecmaVersion: 10,
    sourceType: "script",
    onInsertedSemicolon: null,
    onTrailingComma: null,
    allowReserved: null,
    allowReturnOutsideFunction: !1,
    allowImportExportEverywhere: !1,
    allowAwaitOutsideFunction: !1,
    allowHashBang: !1,
    locations: !1,
    onToken: null,
    onComment: null,
    ranges: !1,
    program: null,
    sourceFile: null,
    directSourceFile: null,
    preserveParens: !1,
  };
  function mr(e) {
    var t = {};
    for (var s in fr) t[s] = e && hr(e, s) ? e[s] : fr[s];
    if (
      (t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009),
      null == t.allowReserved && (t.allowReserved = t.ecmaVersion < 5),
      lr(t.onToken))
    ) {
      var n = t.onToken;
      t.onToken = function(e) {
        return n.push(e);
      };
    }
    return (
      lr(t.onComment) &&
        (t.onComment = (function(e, t) {
          return function(s, n, i, r, a, o) {
            var h = { type: s ? "Block" : "Line", value: n, start: i, end: r };
            e.locations && (h.loc = new dr(this, a, o)),
              e.ranges && (h.range = [i, r]),
              t.push(h);
          };
        })(t, t.onComment)),
      t
    );
  }
  var gr = 2,
    xr = 1 | gr,
    yr = 4,
    Er = 8;
  function br(e, t) {
    return gr | (e ? yr : 0) | (t ? Er : 0);
  }
  var vr = function(e, t, s) {
      (this.options = e = mr(e)),
        (this.sourceFile = e.sourceFile),
        (this.keywords = cr(
          Oi[e.ecmaVersion >= 6 ? 6 : "module" === e.sourceType ? "5module" : 5]
        ));
      var n = "";
      if (!0 !== e.allowReserved) {
        for (var i = e.ecmaVersion; !(n = Ri[i]); i--);
        "module" === e.sourceType && (n += " await");
      }
      this.reservedWords = cr(n);
      var r = (n ? n + " " : "") + Ri.strict;
      (this.reservedWordsStrict = cr(r)),
        (this.reservedWordsStrictBind = cr(r + " " + Ri.strictBind)),
        (this.input = String(t)),
        (this.containsEsc = !1),
        s
          ? ((this.pos = s),
            (this.lineStart = this.input.lastIndexOf("\n", s - 1) + 1),
            (this.curLine = this.input
              .slice(0, this.lineStart)
              .split(er).length))
          : ((this.pos = this.lineStart = 0), (this.curLine = 1)),
        (this.type = Zi.eof),
        (this.value = null),
        (this.start = this.end = this.pos),
        (this.startLoc = this.endLoc = this.curPosition()),
        (this.lastTokEndLoc = this.lastTokStartLoc = null),
        (this.lastTokStart = this.lastTokEnd = this.pos),
        (this.context = this.initialContext()),
        (this.exprAllowed = !0),
        (this.inModule = "module" === e.sourceType),
        (this.strict = this.inModule || this.strictDirective(this.pos)),
        (this.potentialArrowAt = -1),
        (this.yieldPos = this.awaitPos = this.awaitIdentPos = 0),
        (this.labels = []),
        (this.undefinedExports = {}),
        0 === this.pos &&
          e.allowHashBang &&
          "#!" === this.input.slice(0, 2) &&
          this.skipLineComment(2),
        (this.scopeStack = []),
        this.enterScope(1),
        (this.regexpState = null);
    },
    Sr = {
      inFunction: { configurable: !0 },
      inGenerator: { configurable: !0 },
      inAsync: { configurable: !0 },
      allowSuper: { configurable: !0 },
      allowDirectSuper: { configurable: !0 },
      treatFunctionsAsVar: { configurable: !0 },
    };
  (vr.prototype.parse = function() {
    var e = this.options.program || this.startNode();
    return this.nextToken(), this.parseTopLevel(e);
  }),
    (Sr.inFunction.get = function() {
      return (this.currentVarScope().flags & gr) > 0;
    }),
    (Sr.inGenerator.get = function() {
      return (this.currentVarScope().flags & Er) > 0;
    }),
    (Sr.inAsync.get = function() {
      return (this.currentVarScope().flags & yr) > 0;
    }),
    (Sr.allowSuper.get = function() {
      return (64 & this.currentThisScope().flags) > 0;
    }),
    (Sr.allowDirectSuper.get = function() {
      return (128 & this.currentThisScope().flags) > 0;
    }),
    (Sr.treatFunctionsAsVar.get = function() {
      return this.treatFunctionsAsVarInScope(this.currentScope());
    }),
    (vr.prototype.inNonArrowFunction = function() {
      return (this.currentThisScope().flags & gr) > 0;
    }),
    (vr.extend = function() {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      for (var s = this, n = 0; n < e.length; n++) s = e[n](s);
      return s;
    }),
    (vr.parse = function(e, t) {
      return new this(t, e).parse();
    }),
    (vr.parseExpressionAt = function(e, t, s) {
      var n = new this(s, e, t);
      return n.nextToken(), n.parseExpression();
    }),
    (vr.tokenizer = function(e, t) {
      return new this(t, e);
    }),
    Object.defineProperties(vr.prototype, Sr);
  var Ar = vr.prototype,
    Cr = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/;
  function kr() {
    this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
  }
  (Ar.strictDirective = function(e) {
    for (;;) {
      (ir.lastIndex = e), (e += ir.exec(this.input)[0].length);
      var t = Cr.exec(this.input.slice(e));
      if (!t) return !1;
      if ("use strict" === (t[1] || t[2])) return !0;
      (e += t[0].length),
        (ir.lastIndex = e),
        (e += ir.exec(this.input)[0].length),
        ";" === this.input[e] && e++;
    }
  }),
    (Ar.eat = function(e) {
      return this.type === e && (this.next(), !0);
    }),
    (Ar.isContextual = function(e) {
      return this.type === Zi.name && this.value === e && !this.containsEsc;
    }),
    (Ar.eatContextual = function(e) {
      return !!this.isContextual(e) && (this.next(), !0);
    }),
    (Ar.expectContextual = function(e) {
      this.eatContextual(e) || this.unexpected();
    }),
    (Ar.canInsertSemicolon = function() {
      return (
        this.type === Zi.eof ||
        this.type === Zi.braceR ||
        er.test(this.input.slice(this.lastTokEnd, this.start))
      );
    }),
    (Ar.insertSemicolon = function() {
      if (this.canInsertSemicolon())
        return (
          this.options.onInsertedSemicolon &&
            this.options.onInsertedSemicolon(
              this.lastTokEnd,
              this.lastTokEndLoc
            ),
          !0
        );
    }),
    (Ar.semicolon = function() {
      this.eat(Zi.semi) || this.insertSemicolon() || this.unexpected();
    }),
    (Ar.afterTrailingComma = function(e, t) {
      if (this.type === e)
        return (
          this.options.onTrailingComma &&
            this.options.onTrailingComma(
              this.lastTokStart,
              this.lastTokStartLoc
            ),
          t || this.next(),
          !0
        );
    }),
    (Ar.expect = function(e) {
      this.eat(e) || this.unexpected();
    }),
    (Ar.unexpected = function(e) {
      this.raise(null != e ? e : this.start, "Unexpected token");
    }),
    (Ar.checkPatternErrors = function(e, t) {
      if (e) {
        e.trailingComma > -1 &&
          this.raiseRecoverable(
            e.trailingComma,
            "Comma is not permitted after the rest element"
          );
        var s = t ? e.parenthesizedAssign : e.parenthesizedBind;
        s > -1 && this.raiseRecoverable(s, "Parenthesized pattern");
      }
    }),
    (Ar.checkExpressionErrors = function(e, t) {
      if (!e) return !1;
      var s = e.shorthandAssign,
        n = e.doubleProto;
      if (!t) return s >= 0 || n >= 0;
      s >= 0 &&
        this.raise(
          s,
          "Shorthand property assignments are valid only in destructuring patterns"
        ),
        n >= 0 &&
          this.raiseRecoverable(n, "Redefinition of __proto__ property");
    }),
    (Ar.checkYieldAwaitInDefaultParams = function() {
      this.yieldPos &&
        (!this.awaitPos || this.yieldPos < this.awaitPos) &&
        this.raise(this.yieldPos, "Yield expression cannot be a default value"),
        this.awaitPos &&
          this.raise(
            this.awaitPos,
            "Await expression cannot be a default value"
          );
    }),
    (Ar.isSimpleAssignTarget = function(e) {
      return "ParenthesizedExpression" === e.type
        ? this.isSimpleAssignTarget(e.expression)
        : "Identifier" === e.type || "MemberExpression" === e.type;
    });
  var Pr = vr.prototype;
  Pr.parseTopLevel = function(e) {
    var t = {};
    for (e.body || (e.body = []); this.type !== Zi.eof; ) {
      var s = this.parseStatement(null, !0, t);
      e.body.push(s);
    }
    if (this.inModule)
      for (
        var n = 0, i = Object.keys(this.undefinedExports);
        n < i.length;
        n += 1
      ) {
        var r = i[n];
        this.raiseRecoverable(
          this.undefinedExports[r].start,
          "Export '" + r + "' is not defined"
        );
      }
    return (
      this.adaptDirectivePrologue(e.body),
      this.next(),
      (e.sourceType = this.options.sourceType),
      this.finishNode(e, "Program")
    );
  };
  var wr = { kind: "loop" },
    Ir = { kind: "switch" };
  (Pr.isLet = function(e) {
    if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return !1;
    ir.lastIndex = this.pos;
    var t = ir.exec(this.input),
      s = this.pos + t[0].length,
      n = this.input.charCodeAt(s);
    if (91 === n) return !0;
    if (e) return !1;
    if (123 === n) return !0;
    if (Gi(n, !0)) {
      for (var i = s + 1; Hi(this.input.charCodeAt(i), !0); ) ++i;
      var r = this.input.slice(s, i);
      if (!Di.test(r)) return !0;
    }
    return !1;
  }),
    (Pr.isAsyncFunction = function() {
      if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
        return !1;
      ir.lastIndex = this.pos;
      var e = ir.exec(this.input),
        t = this.pos + e[0].length;
      return !(
        er.test(this.input.slice(this.pos, t)) ||
        "function" !== this.input.slice(t, t + 8) ||
        (t + 8 !== this.input.length && Hi(this.input.charAt(t + 8)))
      );
    }),
    (Pr.parseStatement = function(e, t, s) {
      var n,
        i = this.type,
        r = this.startNode();
      switch ((this.isLet(e) && ((i = Zi._var), (n = "let")), i)) {
        case Zi._break:
        case Zi._continue:
          return this.parseBreakContinueStatement(r, i.keyword);
        case Zi._debugger:
          return this.parseDebuggerStatement(r);
        case Zi._do:
          return this.parseDoStatement(r);
        case Zi._for:
          return this.parseForStatement(r);
        case Zi._function:
          return (
            e &&
              (this.strict || ("if" !== e && "label" !== e)) &&
              this.options.ecmaVersion >= 6 &&
              this.unexpected(),
            this.parseFunctionStatement(r, !1, !e)
          );
        case Zi._class:
          return e && this.unexpected(), this.parseClass(r, !0);
        case Zi._if:
          return this.parseIfStatement(r);
        case Zi._return:
          return this.parseReturnStatement(r);
        case Zi._switch:
          return this.parseSwitchStatement(r);
        case Zi._throw:
          return this.parseThrowStatement(r);
        case Zi._try:
          return this.parseTryStatement(r);
        case Zi._const:
        case Zi._var:
          return (
            (n = n || this.value),
            e && "var" !== n && this.unexpected(),
            this.parseVarStatement(r, n)
          );
        case Zi._while:
          return this.parseWhileStatement(r);
        case Zi._with:
          return this.parseWithStatement(r);
        case Zi.braceL:
          return this.parseBlock(!0, r);
        case Zi.semi:
          return this.parseEmptyStatement(r);
        case Zi._export:
        case Zi._import:
          if (this.options.ecmaVersion > 10 && i === Zi._import) {
            ir.lastIndex = this.pos;
            var a = ir.exec(this.input),
              o = this.pos + a[0].length;
            if (40 === this.input.charCodeAt(o))
              return this.parseExpressionStatement(r, this.parseExpression());
          }
          return (
            this.options.allowImportExportEverywhere ||
              (t ||
                this.raise(
                  this.start,
                  "'import' and 'export' may only appear at the top level"
                ),
              this.inModule ||
                this.raise(
                  this.start,
                  "'import' and 'export' may appear only with 'sourceType: module'"
                )),
            i === Zi._import ? this.parseImport(r) : this.parseExport(r, s)
          );
        default:
          if (this.isAsyncFunction())
            return (
              e && this.unexpected(),
              this.next(),
              this.parseFunctionStatement(r, !0, !e)
            );
          var h = this.value,
            l = this.parseExpression();
          return i === Zi.name && "Identifier" === l.type && this.eat(Zi.colon)
            ? this.parseLabeledStatement(r, h, l, e)
            : this.parseExpressionStatement(r, l);
      }
    }),
    (Pr.parseBreakContinueStatement = function(e, t) {
      var s = "break" === t;
      this.next(),
        this.eat(Zi.semi) || this.insertSemicolon()
          ? (e.label = null)
          : this.type !== Zi.name
          ? this.unexpected()
          : ((e.label = this.parseIdent()), this.semicolon());
      for (var n = 0; n < this.labels.length; ++n) {
        var i = this.labels[n];
        if (null == e.label || i.name === e.label.name) {
          if (null != i.kind && (s || "loop" === i.kind)) break;
          if (e.label && s) break;
        }
      }
      return (
        n === this.labels.length && this.raise(e.start, "Unsyntactic " + t),
        this.finishNode(e, s ? "BreakStatement" : "ContinueStatement")
      );
    }),
    (Pr.parseDebuggerStatement = function(e) {
      return (
        this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement")
      );
    }),
    (Pr.parseDoStatement = function(e) {
      return (
        this.next(),
        this.labels.push(wr),
        (e.body = this.parseStatement("do")),
        this.labels.pop(),
        this.expect(Zi._while),
        (e.test = this.parseParenExpression()),
        this.options.ecmaVersion >= 6 ? this.eat(Zi.semi) : this.semicolon(),
        this.finishNode(e, "DoWhileStatement")
      );
    }),
    (Pr.parseForStatement = function(e) {
      this.next();
      var t =
        this.options.ecmaVersion >= 9 &&
        (this.inAsync ||
          (!this.inFunction && this.options.allowAwaitOutsideFunction)) &&
        this.eatContextual("await")
          ? this.lastTokStart
          : -1;
      if (
        (this.labels.push(wr),
        this.enterScope(0),
        this.expect(Zi.parenL),
        this.type === Zi.semi)
      )
        return t > -1 && this.unexpected(t), this.parseFor(e, null);
      var s = this.isLet();
      if (this.type === Zi._var || this.type === Zi._const || s) {
        var n = this.startNode(),
          i = s ? "let" : this.value;
        return (
          this.next(),
          this.parseVar(n, !0, i),
          this.finishNode(n, "VariableDeclaration"),
          (this.type === Zi._in ||
            (this.options.ecmaVersion >= 6 && this.isContextual("of"))) &&
          1 === n.declarations.length
            ? (this.options.ecmaVersion >= 9 &&
                (this.type === Zi._in
                  ? t > -1 && this.unexpected(t)
                  : (e.await = t > -1)),
              this.parseForIn(e, n))
            : (t > -1 && this.unexpected(t), this.parseFor(e, n))
        );
      }
      var r = new kr(),
        a = this.parseExpression(!0, r);
      return this.type === Zi._in ||
        (this.options.ecmaVersion >= 6 && this.isContextual("of"))
        ? (this.options.ecmaVersion >= 9 &&
            (this.type === Zi._in
              ? t > -1 && this.unexpected(t)
              : (e.await = t > -1)),
          this.toAssignable(a, !1, r),
          this.checkLVal(a),
          this.parseForIn(e, a))
        : (this.checkExpressionErrors(r, !0),
          t > -1 && this.unexpected(t),
          this.parseFor(e, a));
    }),
    (Pr.parseFunctionStatement = function(e, t, s) {
      return this.next(), this.parseFunction(e, $r | (s ? 0 : _r), !1, t);
    }),
    (Pr.parseIfStatement = function(e) {
      return (
        this.next(),
        (e.test = this.parseParenExpression()),
        (e.consequent = this.parseStatement("if")),
        (e.alternate = this.eat(Zi._else) ? this.parseStatement("if") : null),
        this.finishNode(e, "IfStatement")
      );
    }),
    (Pr.parseReturnStatement = function(e) {
      return (
        this.inFunction ||
          this.options.allowReturnOutsideFunction ||
          this.raise(this.start, "'return' outside of function"),
        this.next(),
        this.eat(Zi.semi) || this.insertSemicolon()
          ? (e.argument = null)
          : ((e.argument = this.parseExpression()), this.semicolon()),
        this.finishNode(e, "ReturnStatement")
      );
    }),
    (Pr.parseSwitchStatement = function(e) {
      var t;
      this.next(),
        (e.discriminant = this.parseParenExpression()),
        (e.cases = []),
        this.expect(Zi.braceL),
        this.labels.push(Ir),
        this.enterScope(0);
      for (var s = !1; this.type !== Zi.braceR; )
        if (this.type === Zi._case || this.type === Zi._default) {
          var n = this.type === Zi._case;
          t && this.finishNode(t, "SwitchCase"),
            e.cases.push((t = this.startNode())),
            (t.consequent = []),
            this.next(),
            n
              ? (t.test = this.parseExpression())
              : (s &&
                  this.raiseRecoverable(
                    this.lastTokStart,
                    "Multiple default clauses"
                  ),
                (s = !0),
                (t.test = null)),
            this.expect(Zi.colon);
        } else
          t || this.unexpected(), t.consequent.push(this.parseStatement(null));
      return (
        this.exitScope(),
        t && this.finishNode(t, "SwitchCase"),
        this.next(),
        this.labels.pop(),
        this.finishNode(e, "SwitchStatement")
      );
    }),
    (Pr.parseThrowStatement = function(e) {
      return (
        this.next(),
        er.test(this.input.slice(this.lastTokEnd, this.start)) &&
          this.raise(this.lastTokEnd, "Illegal newline after throw"),
        (e.argument = this.parseExpression()),
        this.semicolon(),
        this.finishNode(e, "ThrowStatement")
      );
    });
  var Nr = [];
  (Pr.parseTryStatement = function(e) {
    if (
      (this.next(),
      (e.block = this.parseBlock()),
      (e.handler = null),
      this.type === Zi._catch)
    ) {
      var t = this.startNode();
      if ((this.next(), this.eat(Zi.parenL))) {
        t.param = this.parseBindingAtom();
        var s = "Identifier" === t.param.type;
        this.enterScope(s ? 32 : 0),
          this.checkLVal(t.param, s ? 4 : 2),
          this.expect(Zi.parenR);
      } else
        this.options.ecmaVersion < 10 && this.unexpected(),
          (t.param = null),
          this.enterScope(0);
      (t.body = this.parseBlock(!1)),
        this.exitScope(),
        (e.handler = this.finishNode(t, "CatchClause"));
    }
    return (
      (e.finalizer = this.eat(Zi._finally) ? this.parseBlock() : null),
      e.handler ||
        e.finalizer ||
        this.raise(e.start, "Missing catch or finally clause"),
      this.finishNode(e, "TryStatement")
    );
  }),
    (Pr.parseVarStatement = function(e, t) {
      return (
        this.next(),
        this.parseVar(e, !1, t),
        this.semicolon(),
        this.finishNode(e, "VariableDeclaration")
      );
    }),
    (Pr.parseWhileStatement = function(e) {
      return (
        this.next(),
        (e.test = this.parseParenExpression()),
        this.labels.push(wr),
        (e.body = this.parseStatement("while")),
        this.labels.pop(),
        this.finishNode(e, "WhileStatement")
      );
    }),
    (Pr.parseWithStatement = function(e) {
      return (
        this.strict && this.raise(this.start, "'with' in strict mode"),
        this.next(),
        (e.object = this.parseParenExpression()),
        (e.body = this.parseStatement("with")),
        this.finishNode(e, "WithStatement")
      );
    }),
    (Pr.parseEmptyStatement = function(e) {
      return this.next(), this.finishNode(e, "EmptyStatement");
    }),
    (Pr.parseLabeledStatement = function(e, t, s, n) {
      for (var i = 0, r = this.labels; i < r.length; i += 1) {
        r[i].name === t &&
          this.raise(s.start, "Label '" + t + "' is already declared");
      }
      for (
        var a = this.type.isLoop
            ? "loop"
            : this.type === Zi._switch
            ? "switch"
            : null,
          o = this.labels.length - 1;
        o >= 0;
        o--
      ) {
        var h = this.labels[o];
        if (h.statementStart !== e.start) break;
        (h.statementStart = this.start), (h.kind = a);
      }
      return (
        this.labels.push({ name: t, kind: a, statementStart: this.start }),
        (e.body = this.parseStatement(
          n ? (-1 === n.indexOf("label") ? n + "label" : n) : "label"
        )),
        this.labels.pop(),
        (e.label = s),
        this.finishNode(e, "LabeledStatement")
      );
    }),
    (Pr.parseExpressionStatement = function(e, t) {
      return (
        (e.expression = t),
        this.semicolon(),
        this.finishNode(e, "ExpressionStatement")
      );
    }),
    (Pr.parseBlock = function(e, t) {
      for (
        void 0 === e && (e = !0),
          void 0 === t && (t = this.startNode()),
          t.body = [],
          this.expect(Zi.braceL),
          e && this.enterScope(0);
        !this.eat(Zi.braceR);

      ) {
        var s = this.parseStatement(null);
        t.body.push(s);
      }
      return e && this.exitScope(), this.finishNode(t, "BlockStatement");
    }),
    (Pr.parseFor = function(e, t) {
      return (
        (e.init = t),
        this.expect(Zi.semi),
        (e.test = this.type === Zi.semi ? null : this.parseExpression()),
        this.expect(Zi.semi),
        (e.update = this.type === Zi.parenR ? null : this.parseExpression()),
        this.expect(Zi.parenR),
        (e.body = this.parseStatement("for")),
        this.exitScope(),
        this.labels.pop(),
        this.finishNode(e, "ForStatement")
      );
    }),
    (Pr.parseForIn = function(e, t) {
      var s = this.type === Zi._in;
      return (
        this.next(),
        "VariableDeclaration" === t.type &&
        null != t.declarations[0].init &&
        (!s ||
          this.options.ecmaVersion < 8 ||
          this.strict ||
          "var" !== t.kind ||
          "Identifier" !== t.declarations[0].id.type)
          ? this.raise(
              t.start,
              (s ? "for-in" : "for-of") +
                " loop variable declaration may not have an initializer"
            )
          : "AssignmentPattern" === t.type &&
            this.raise(t.start, "Invalid left-hand side in for-loop"),
        (e.left = t),
        (e.right = s ? this.parseExpression() : this.parseMaybeAssign()),
        this.expect(Zi.parenR),
        (e.body = this.parseStatement("for")),
        this.exitScope(),
        this.labels.pop(),
        this.finishNode(e, s ? "ForInStatement" : "ForOfStatement")
      );
    }),
    (Pr.parseVar = function(e, t, s) {
      for (e.declarations = [], e.kind = s; ; ) {
        var n = this.startNode();
        if (
          (this.parseVarId(n, s),
          this.eat(Zi.eq)
            ? (n.init = this.parseMaybeAssign(t))
            : "const" !== s ||
              this.type === Zi._in ||
              (this.options.ecmaVersion >= 6 && this.isContextual("of"))
            ? "Identifier" === n.id.type ||
              (t && (this.type === Zi._in || this.isContextual("of")))
              ? (n.init = null)
              : this.raise(
                  this.lastTokEnd,
                  "Complex binding patterns require an initialization value"
                )
            : this.unexpected(),
          e.declarations.push(this.finishNode(n, "VariableDeclarator")),
          !this.eat(Zi.comma))
        )
          break;
      }
      return e;
    }),
    (Pr.parseVarId = function(e, t) {
      (e.id = this.parseBindingAtom()),
        this.checkLVal(e.id, "var" === t ? 1 : 2, !1);
    });
  var $r = 1,
    _r = 2;
  (Pr.parseFunction = function(e, t, s, n) {
    this.initFunction(e),
      (this.options.ecmaVersion >= 9 ||
        (this.options.ecmaVersion >= 6 && !n)) &&
        (this.type === Zi.star && t & _r && this.unexpected(),
        (e.generator = this.eat(Zi.star))),
      this.options.ecmaVersion >= 8 && (e.async = !!n),
      t & $r &&
        ((e.id = 4 & t && this.type !== Zi.name ? null : this.parseIdent()),
        !e.id ||
          t & _r ||
          this.checkLVal(
            e.id,
            this.strict || e.generator || e.async
              ? this.treatFunctionsAsVar
                ? 1
                : 2
              : 3
          ));
    var i = this.yieldPos,
      r = this.awaitPos,
      a = this.awaitIdentPos;
    return (
      (this.yieldPos = 0),
      (this.awaitPos = 0),
      (this.awaitIdentPos = 0),
      this.enterScope(br(e.async, e.generator)),
      t & $r || (e.id = this.type === Zi.name ? this.parseIdent() : null),
      this.parseFunctionParams(e),
      this.parseFunctionBody(e, s, !1),
      (this.yieldPos = i),
      (this.awaitPos = r),
      (this.awaitIdentPos = a),
      this.finishNode(e, t & $r ? "FunctionDeclaration" : "FunctionExpression")
    );
  }),
    (Pr.parseFunctionParams = function(e) {
      this.expect(Zi.parenL),
        (e.params = this.parseBindingList(
          Zi.parenR,
          !1,
          this.options.ecmaVersion >= 8
        )),
        this.checkYieldAwaitInDefaultParams();
    }),
    (Pr.parseClass = function(e, t) {
      this.next();
      var s = this.strict;
      (this.strict = !0), this.parseClassId(e, t), this.parseClassSuper(e);
      var n = this.startNode(),
        i = !1;
      for (n.body = [], this.expect(Zi.braceL); !this.eat(Zi.braceR); ) {
        var r = this.parseClassElement(null !== e.superClass);
        r &&
          (n.body.push(r),
          "MethodDefinition" === r.type &&
            "constructor" === r.kind &&
            (i &&
              this.raise(r.start, "Duplicate constructor in the same class"),
            (i = !0)));
      }
      return (
        (e.body = this.finishNode(n, "ClassBody")),
        (this.strict = s),
        this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression")
      );
    }),
    (Pr.parseClassElement = function(e) {
      var t = this;
      if (this.eat(Zi.semi)) return null;
      var s = this.startNode(),
        n = function(e, n) {
          void 0 === n && (n = !1);
          var i = t.start,
            r = t.startLoc;
          return (
            !!t.eatContextual(e) &&
            (!(t.type === Zi.parenL || (n && t.canInsertSemicolon())) ||
              (s.key && t.unexpected(),
              (s.computed = !1),
              (s.key = t.startNodeAt(i, r)),
              (s.key.name = e),
              t.finishNode(s.key, "Identifier"),
              !1))
          );
        };
      (s.kind = "method"), (s.static = n("static"));
      var i = this.eat(Zi.star),
        r = !1;
      i ||
        (this.options.ecmaVersion >= 8 && n("async", !0)
          ? ((r = !0), (i = this.options.ecmaVersion >= 9 && this.eat(Zi.star)))
          : n("get")
          ? (s.kind = "get")
          : n("set") && (s.kind = "set")),
        s.key || this.parsePropertyName(s);
      var a = s.key,
        o = !1;
      return (
        s.computed ||
        s.static ||
        !(
          ("Identifier" === a.type && "constructor" === a.name) ||
          ("Literal" === a.type && "constructor" === a.value)
        )
          ? s.static &&
            "Identifier" === a.type &&
            "prototype" === a.name &&
            this.raise(
              a.start,
              "Classes may not have a static property named prototype"
            )
          : ("method" !== s.kind &&
              this.raise(a.start, "Constructor can't have get/set modifier"),
            i && this.raise(a.start, "Constructor can't be a generator"),
            r && this.raise(a.start, "Constructor can't be an async method"),
            (s.kind = "constructor"),
            (o = e)),
        this.parseClassMethod(s, i, r, o),
        "get" === s.kind &&
          0 !== s.value.params.length &&
          this.raiseRecoverable(s.value.start, "getter should have no params"),
        "set" === s.kind &&
          1 !== s.value.params.length &&
          this.raiseRecoverable(
            s.value.start,
            "setter should have exactly one param"
          ),
        "set" === s.kind &&
          "RestElement" === s.value.params[0].type &&
          this.raiseRecoverable(
            s.value.params[0].start,
            "Setter cannot use rest params"
          ),
        s
      );
    }),
    (Pr.parseClassMethod = function(e, t, s, n) {
      return (
        (e.value = this.parseMethod(t, s, n)),
        this.finishNode(e, "MethodDefinition")
      );
    }),
    (Pr.parseClassId = function(e, t) {
      this.type === Zi.name
        ? ((e.id = this.parseIdent()), t && this.checkLVal(e.id, 2, !1))
        : (!0 === t && this.unexpected(), (e.id = null));
    }),
    (Pr.parseClassSuper = function(e) {
      e.superClass = this.eat(Zi._extends) ? this.parseExprSubscripts() : null;
    }),
    (Pr.parseExport = function(e, t) {
      if ((this.next(), this.eat(Zi.star)))
        return (
          this.expectContextual("from"),
          this.type !== Zi.string && this.unexpected(),
          (e.source = this.parseExprAtom()),
          this.semicolon(),
          this.finishNode(e, "ExportAllDeclaration")
        );
      if (this.eat(Zi._default)) {
        var s;
        if (
          (this.checkExport(t, "default", this.lastTokStart),
          this.type === Zi._function || (s = this.isAsyncFunction()))
        ) {
          var n = this.startNode();
          this.next(),
            s && this.next(),
            (e.declaration = this.parseFunction(n, 4 | $r, !1, s));
        } else if (this.type === Zi._class) {
          var i = this.startNode();
          e.declaration = this.parseClass(i, "nullableID");
        } else (e.declaration = this.parseMaybeAssign()), this.semicolon();
        return this.finishNode(e, "ExportDefaultDeclaration");
      }
      if (this.shouldParseExportStatement())
        (e.declaration = this.parseStatement(null)),
          "VariableDeclaration" === e.declaration.type
            ? this.checkVariableExport(t, e.declaration.declarations)
            : this.checkExport(
                t,
                e.declaration.id.name,
                e.declaration.id.start
              ),
          (e.specifiers = []),
          (e.source = null);
      else {
        if (
          ((e.declaration = null),
          (e.specifiers = this.parseExportSpecifiers(t)),
          this.eatContextual("from"))
        )
          this.type !== Zi.string && this.unexpected(),
            (e.source = this.parseExprAtom());
        else {
          for (var r = 0, a = e.specifiers; r < a.length; r += 1) {
            var o = a[r];
            this.checkUnreserved(o.local), this.checkLocalExport(o.local);
          }
          e.source = null;
        }
        this.semicolon();
      }
      return this.finishNode(e, "ExportNamedDeclaration");
    }),
    (Pr.checkExport = function(e, t, s) {
      e &&
        (hr(e, t) && this.raiseRecoverable(s, "Duplicate export '" + t + "'"),
        (e[t] = !0));
    }),
    (Pr.checkPatternExport = function(e, t) {
      var s = t.type;
      if ("Identifier" === s) this.checkExport(e, t.name, t.start);
      else if ("ObjectPattern" === s)
        for (var n = 0, i = t.properties; n < i.length; n += 1) {
          var r = i[n];
          this.checkPatternExport(e, r);
        }
      else if ("ArrayPattern" === s)
        for (var a = 0, o = t.elements; a < o.length; a += 1) {
          var h = o[a];
          h && this.checkPatternExport(e, h);
        }
      else
        "Property" === s
          ? this.checkPatternExport(e, t.value)
          : "AssignmentPattern" === s
          ? this.checkPatternExport(e, t.left)
          : "RestElement" === s
          ? this.checkPatternExport(e, t.argument)
          : "ParenthesizedExpression" === s &&
            this.checkPatternExport(e, t.expression);
    }),
    (Pr.checkVariableExport = function(e, t) {
      if (e)
        for (var s = 0, n = t; s < n.length; s += 1) {
          var i = n[s];
          this.checkPatternExport(e, i.id);
        }
    }),
    (Pr.shouldParseExportStatement = function() {
      return (
        "var" === this.type.keyword ||
        "const" === this.type.keyword ||
        "class" === this.type.keyword ||
        "function" === this.type.keyword ||
        this.isLet() ||
        this.isAsyncFunction()
      );
    }),
    (Pr.parseExportSpecifiers = function(e) {
      var t = [],
        s = !0;
      for (this.expect(Zi.braceL); !this.eat(Zi.braceR); ) {
        if (s) s = !1;
        else if ((this.expect(Zi.comma), this.afterTrailingComma(Zi.braceR)))
          break;
        var n = this.startNode();
        (n.local = this.parseIdent(!0)),
          (n.exported = this.eatContextual("as")
            ? this.parseIdent(!0)
            : n.local),
          this.checkExport(e, n.exported.name, n.exported.start),
          t.push(this.finishNode(n, "ExportSpecifier"));
      }
      return t;
    }),
    (Pr.parseImport = function(e) {
      return (
        this.next(),
        this.type === Zi.string
          ? ((e.specifiers = Nr), (e.source = this.parseExprAtom()))
          : ((e.specifiers = this.parseImportSpecifiers()),
            this.expectContextual("from"),
            (e.source =
              this.type === Zi.string
                ? this.parseExprAtom()
                : this.unexpected())),
        this.semicolon(),
        this.finishNode(e, "ImportDeclaration")
      );
    }),
    (Pr.parseImportSpecifiers = function() {
      var e = [],
        t = !0;
      if (this.type === Zi.name) {
        var s = this.startNode();
        if (
          ((s.local = this.parseIdent()),
          this.checkLVal(s.local, 2),
          e.push(this.finishNode(s, "ImportDefaultSpecifier")),
          !this.eat(Zi.comma))
        )
          return e;
      }
      if (this.type === Zi.star) {
        var n = this.startNode();
        return (
          this.next(),
          this.expectContextual("as"),
          (n.local = this.parseIdent()),
          this.checkLVal(n.local, 2),
          e.push(this.finishNode(n, "ImportNamespaceSpecifier")),
          e
        );
      }
      for (this.expect(Zi.braceL); !this.eat(Zi.braceR); ) {
        if (t) t = !1;
        else if ((this.expect(Zi.comma), this.afterTrailingComma(Zi.braceR)))
          break;
        var i = this.startNode();
        (i.imported = this.parseIdent(!0)),
          this.eatContextual("as")
            ? (i.local = this.parseIdent())
            : (this.checkUnreserved(i.imported), (i.local = i.imported)),
          this.checkLVal(i.local, 2),
          e.push(this.finishNode(i, "ImportSpecifier"));
      }
      return e;
    }),
    (Pr.adaptDirectivePrologue = function(e) {
      for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
        e[t].directive = e[t].expression.raw.slice(1, -1);
    }),
    (Pr.isDirectiveCandidate = function(e) {
      return (
        "ExpressionStatement" === e.type &&
        "Literal" === e.expression.type &&
        "string" == typeof e.expression.value &&
        ('"' === this.input[e.start] || "'" === this.input[e.start])
      );
    });
  var Lr = vr.prototype;
  (Lr.toAssignable = function(e, t, s) {
    if (this.options.ecmaVersion >= 6 && e)
      switch (e.type) {
        case "Identifier":
          this.inAsync &&
            "await" === e.name &&
            this.raise(
              e.start,
              "Cannot use 'await' as identifier inside an async function"
            );
          break;
        case "ObjectPattern":
        case "ArrayPattern":
        case "RestElement":
          break;
        case "ObjectExpression":
          (e.type = "ObjectPattern"), s && this.checkPatternErrors(s, !0);
          for (var n = 0, i = e.properties; n < i.length; n += 1) {
            var r = i[n];
            this.toAssignable(r, t),
              "RestElement" !== r.type ||
                ("ArrayPattern" !== r.argument.type &&
                  "ObjectPattern" !== r.argument.type) ||
                this.raise(r.argument.start, "Unexpected token");
          }
          break;
        case "Property":
          "init" !== e.kind &&
            this.raise(
              e.key.start,
              "Object pattern can't contain getter or setter"
            ),
            this.toAssignable(e.value, t);
          break;
        case "ArrayExpression":
          (e.type = "ArrayPattern"),
            s && this.checkPatternErrors(s, !0),
            this.toAssignableList(e.elements, t);
          break;
        case "SpreadElement":
          (e.type = "RestElement"),
            this.toAssignable(e.argument, t),
            "AssignmentPattern" === e.argument.type &&
              this.raise(
                e.argument.start,
                "Rest elements cannot have a default value"
              );
          break;
        case "AssignmentExpression":
          "=" !== e.operator &&
            this.raise(
              e.left.end,
              "Only '=' operator can be used for specifying default value."
            ),
            (e.type = "AssignmentPattern"),
            delete e.operator,
            this.toAssignable(e.left, t);
        case "AssignmentPattern":
          break;
        case "ParenthesizedExpression":
          this.toAssignable(e.expression, t, s);
          break;
        case "MemberExpression":
          if (!t) break;
        default:
          this.raise(e.start, "Assigning to rvalue");
      }
    else s && this.checkPatternErrors(s, !0);
    return e;
  }),
    (Lr.toAssignableList = function(e, t) {
      for (var s = e.length, n = 0; n < s; n++) {
        var i = e[n];
        i && this.toAssignable(i, t);
      }
      if (s) {
        var r = e[s - 1];
        6 === this.options.ecmaVersion &&
          t &&
          r &&
          "RestElement" === r.type &&
          "Identifier" !== r.argument.type &&
          this.unexpected(r.argument.start);
      }
      return e;
    }),
    (Lr.parseSpread = function(e) {
      var t = this.startNode();
      return (
        this.next(),
        (t.argument = this.parseMaybeAssign(!1, e)),
        this.finishNode(t, "SpreadElement")
      );
    }),
    (Lr.parseRestBinding = function() {
      var e = this.startNode();
      return (
        this.next(),
        6 === this.options.ecmaVersion &&
          this.type !== Zi.name &&
          this.unexpected(),
        (e.argument = this.parseBindingAtom()),
        this.finishNode(e, "RestElement")
      );
    }),
    (Lr.parseBindingAtom = function() {
      if (this.options.ecmaVersion >= 6)
        switch (this.type) {
          case Zi.bracketL:
            var e = this.startNode();
            return (
              this.next(),
              (e.elements = this.parseBindingList(Zi.bracketR, !0, !0)),
              this.finishNode(e, "ArrayPattern")
            );
          case Zi.braceL:
            return this.parseObj(!0);
        }
      return this.parseIdent();
    }),
    (Lr.parseBindingList = function(e, t, s) {
      for (var n = [], i = !0; !this.eat(e); )
        if ((i ? (i = !1) : this.expect(Zi.comma), t && this.type === Zi.comma))
          n.push(null);
        else {
          if (s && this.afterTrailingComma(e)) break;
          if (this.type === Zi.ellipsis) {
            var r = this.parseRestBinding();
            this.parseBindingListItem(r),
              n.push(r),
              this.type === Zi.comma &&
                this.raise(
                  this.start,
                  "Comma is not permitted after the rest element"
                ),
              this.expect(e);
            break;
          }
          var a = this.parseMaybeDefault(this.start, this.startLoc);
          this.parseBindingListItem(a), n.push(a);
        }
      return n;
    }),
    (Lr.parseBindingListItem = function(e) {
      return e;
    }),
    (Lr.parseMaybeDefault = function(e, t, s) {
      if (
        ((s = s || this.parseBindingAtom()),
        this.options.ecmaVersion < 6 || !this.eat(Zi.eq))
      )
        return s;
      var n = this.startNodeAt(e, t);
      return (
        (n.left = s),
        (n.right = this.parseMaybeAssign()),
        this.finishNode(n, "AssignmentPattern")
      );
    }),
    (Lr.checkLVal = function(e, t, s) {
      switch ((void 0 === t && (t = 0), e.type)) {
        case "Identifier":
          2 === t &&
            "let" === e.name &&
            this.raiseRecoverable(
              e.start,
              "let is disallowed as a lexically bound name"
            ),
            this.strict &&
              this.reservedWordsStrictBind.test(e.name) &&
              this.raiseRecoverable(
                e.start,
                (t ? "Binding " : "Assigning to ") + e.name + " in strict mode"
              ),
            s &&
              (hr(s, e.name) &&
                this.raiseRecoverable(e.start, "Argument name clash"),
              (s[e.name] = !0)),
            0 !== t && 5 !== t && this.declareName(e.name, t, e.start);
          break;
        case "MemberExpression":
          t && this.raiseRecoverable(e.start, "Binding member expression");
          break;
        case "ObjectPattern":
          for (var n = 0, i = e.properties; n < i.length; n += 1) {
            var r = i[n];
            this.checkLVal(r, t, s);
          }
          break;
        case "Property":
          this.checkLVal(e.value, t, s);
          break;
        case "ArrayPattern":
          for (var a = 0, o = e.elements; a < o.length; a += 1) {
            var h = o[a];
            h && this.checkLVal(h, t, s);
          }
          break;
        case "AssignmentPattern":
          this.checkLVal(e.left, t, s);
          break;
        case "RestElement":
          this.checkLVal(e.argument, t, s);
          break;
        case "ParenthesizedExpression":
          this.checkLVal(e.expression, t, s);
          break;
        default:
          this.raise(e.start, (t ? "Binding" : "Assigning to") + " rvalue");
      }
    });
  var Tr = vr.prototype;
  (Tr.checkPropClash = function(e, t, s) {
    if (
      !(
        (this.options.ecmaVersion >= 9 && "SpreadElement" === e.type) ||
        (this.options.ecmaVersion >= 6 &&
          (e.computed || e.method || e.shorthand))
      )
    ) {
      var n,
        i = e.key;
      switch (i.type) {
        case "Identifier":
          n = i.name;
          break;
        case "Literal":
          n = String(i.value);
          break;
        default:
          return;
      }
      var r = e.kind;
      if (this.options.ecmaVersion >= 6)
        "__proto__" === n &&
          "init" === r &&
          (t.proto &&
            (s && s.doubleProto < 0
              ? (s.doubleProto = i.start)
              : this.raiseRecoverable(
                  i.start,
                  "Redefinition of __proto__ property"
                )),
          (t.proto = !0));
      else {
        var a = t[(n = "$" + n)];
        if (a)
          ("init" === r
            ? (this.strict && a.init) || a.get || a.set
            : a.init || a[r]) &&
            this.raiseRecoverable(i.start, "Redefinition of property");
        else a = t[n] = { init: !1, get: !1, set: !1 };
        a[r] = !0;
      }
    }
  }),
    (Tr.parseExpression = function(e, t) {
      var s = this.start,
        n = this.startLoc,
        i = this.parseMaybeAssign(e, t);
      if (this.type === Zi.comma) {
        var r = this.startNodeAt(s, n);
        for (r.expressions = [i]; this.eat(Zi.comma); )
          r.expressions.push(this.parseMaybeAssign(e, t));
        return this.finishNode(r, "SequenceExpression");
      }
      return i;
    }),
    (Tr.parseMaybeAssign = function(e, t, s) {
      if (this.isContextual("yield")) {
        if (this.inGenerator) return this.parseYield(e);
        this.exprAllowed = !1;
      }
      var n = !1,
        i = -1,
        r = -1,
        a = -1;
      t
        ? ((i = t.parenthesizedAssign),
          (r = t.trailingComma),
          (a = t.shorthandAssign),
          (t.parenthesizedAssign = t.trailingComma = t.shorthandAssign = -1))
        : ((t = new kr()), (n = !0));
      var o = this.start,
        h = this.startLoc;
      (this.type !== Zi.parenL && this.type !== Zi.name) ||
        (this.potentialArrowAt = this.start);
      var l = this.parseMaybeConditional(e, t);
      if ((s && (l = s.call(this, l, o, h)), this.type.isAssign)) {
        var c = this.startNodeAt(o, h);
        return (
          (c.operator = this.value),
          (c.left = this.type === Zi.eq ? this.toAssignable(l, !1, t) : l),
          n || kr.call(t),
          (t.shorthandAssign = -1),
          this.checkLVal(l),
          this.next(),
          (c.right = this.parseMaybeAssign(e)),
          this.finishNode(c, "AssignmentExpression")
        );
      }
      return (
        n && this.checkExpressionErrors(t, !0),
        i > -1 && (t.parenthesizedAssign = i),
        r > -1 && (t.trailingComma = r),
        a > -1 && (t.shorthandAssign = a),
        l
      );
    }),
    (Tr.parseMaybeConditional = function(e, t) {
      var s = this.start,
        n = this.startLoc,
        i = this.parseExprOps(e, t);
      if (this.checkExpressionErrors(t)) return i;
      if (this.eat(Zi.question)) {
        var r = this.startNodeAt(s, n);
        return (
          (r.test = i),
          (r.consequent = this.parseMaybeAssign()),
          this.expect(Zi.colon),
          (r.alternate = this.parseMaybeAssign(e)),
          this.finishNode(r, "ConditionalExpression")
        );
      }
      return i;
    }),
    (Tr.parseExprOps = function(e, t) {
      var s = this.start,
        n = this.startLoc,
        i = this.parseMaybeUnary(t, !1);
      return this.checkExpressionErrors(t)
        ? i
        : i.start === s && "ArrowFunctionExpression" === i.type
        ? i
        : this.parseExprOp(i, s, n, -1, e);
    }),
    (Tr.parseExprOp = function(e, t, s, n, i) {
      var r = this.type.binop;
      if (null != r && (!i || this.type !== Zi._in) && r > n) {
        var a = this.type === Zi.logicalOR || this.type === Zi.logicalAND,
          o = this.value;
        this.next();
        var h = this.start,
          l = this.startLoc,
          c = this.parseExprOp(this.parseMaybeUnary(null, !1), h, l, r, i),
          u = this.buildBinary(t, s, e, c, o, a);
        return this.parseExprOp(u, t, s, n, i);
      }
      return e;
    }),
    (Tr.buildBinary = function(e, t, s, n, i, r) {
      var a = this.startNodeAt(e, t);
      return (
        (a.left = s),
        (a.operator = i),
        (a.right = n),
        this.finishNode(a, r ? "LogicalExpression" : "BinaryExpression")
      );
    }),
    (Tr.parseMaybeUnary = function(e, t) {
      var s,
        n = this.start,
        i = this.startLoc;
      if (
        this.isContextual("await") &&
        (this.inAsync ||
          (!this.inFunction && this.options.allowAwaitOutsideFunction))
      )
        (s = this.parseAwait()), (t = !0);
      else if (this.type.prefix) {
        var r = this.startNode(),
          a = this.type === Zi.incDec;
        (r.operator = this.value),
          (r.prefix = !0),
          this.next(),
          (r.argument = this.parseMaybeUnary(null, !0)),
          this.checkExpressionErrors(e, !0),
          a
            ? this.checkLVal(r.argument)
            : this.strict &&
              "delete" === r.operator &&
              "Identifier" === r.argument.type
            ? this.raiseRecoverable(
                r.start,
                "Deleting local variable in strict mode"
              )
            : (t = !0),
          (s = this.finishNode(r, a ? "UpdateExpression" : "UnaryExpression"));
      } else {
        if (((s = this.parseExprSubscripts(e)), this.checkExpressionErrors(e)))
          return s;
        for (; this.type.postfix && !this.canInsertSemicolon(); ) {
          var o = this.startNodeAt(n, i);
          (o.operator = this.value),
            (o.prefix = !1),
            (o.argument = s),
            this.checkLVal(s),
            this.next(),
            (s = this.finishNode(o, "UpdateExpression"));
        }
      }
      return !t && this.eat(Zi.starstar)
        ? this.buildBinary(n, i, s, this.parseMaybeUnary(null, !1), "**", !1)
        : s;
    }),
    (Tr.parseExprSubscripts = function(e) {
      var t = this.start,
        s = this.startLoc,
        n = this.parseExprAtom(e),
        i =
          "ArrowFunctionExpression" === n.type &&
          ")" !== this.input.slice(this.lastTokStart, this.lastTokEnd);
      if (this.checkExpressionErrors(e) || i) return n;
      var r = this.parseSubscripts(n, t, s);
      return (
        e &&
          "MemberExpression" === r.type &&
          (e.parenthesizedAssign >= r.start && (e.parenthesizedAssign = -1),
          e.parenthesizedBind >= r.start && (e.parenthesizedBind = -1)),
        r
      );
    }),
    (Tr.parseSubscripts = function(e, t, s, n) {
      for (
        var i =
          this.options.ecmaVersion >= 8 &&
          "Identifier" === e.type &&
          "async" === e.name &&
          this.lastTokEnd === e.end &&
          !this.canInsertSemicolon() &&
          "async" === this.input.slice(e.start, e.end);
        ;

      ) {
        var r = this.parseSubscript(e, t, s, n, i);
        if (r === e || "ArrowFunctionExpression" === r.type) return r;
        e = r;
      }
    }),
    (Tr.parseSubscript = function(e, t, s, n, i) {
      var r = this.eat(Zi.bracketL);
      if (r || this.eat(Zi.dot)) {
        var a = this.startNodeAt(t, s);
        (a.object = e),
          (a.property = r
            ? this.parseExpression()
            : this.parseIdent("never" !== this.options.allowReserved)),
          (a.computed = !!r),
          r && this.expect(Zi.bracketR),
          (e = this.finishNode(a, "MemberExpression"));
      } else if (!n && this.eat(Zi.parenL)) {
        var o = new kr(),
          h = this.yieldPos,
          l = this.awaitPos,
          c = this.awaitIdentPos;
        (this.yieldPos = 0), (this.awaitPos = 0), (this.awaitIdentPos = 0);
        var u = this.parseExprList(
          Zi.parenR,
          this.options.ecmaVersion >= 8,
          !1,
          o
        );
        if (i && !this.canInsertSemicolon() && this.eat(Zi.arrow))
          return (
            this.checkPatternErrors(o, !1),
            this.checkYieldAwaitInDefaultParams(),
            this.awaitIdentPos > 0 &&
              this.raise(
                this.awaitIdentPos,
                "Cannot use 'await' as identifier inside an async function"
              ),
            (this.yieldPos = h),
            (this.awaitPos = l),
            (this.awaitIdentPos = c),
            this.parseArrowExpression(this.startNodeAt(t, s), u, !0)
          );
        this.checkExpressionErrors(o, !0),
          (this.yieldPos = h || this.yieldPos),
          (this.awaitPos = l || this.awaitPos),
          (this.awaitIdentPos = c || this.awaitIdentPos);
        var d = this.startNodeAt(t, s);
        (d.callee = e),
          (d.arguments = u),
          (e = this.finishNode(d, "CallExpression"));
      } else if (this.type === Zi.backQuote) {
        var p = this.startNodeAt(t, s);
        (p.tag = e),
          (p.quasi = this.parseTemplate({ isTagged: !0 })),
          (e = this.finishNode(p, "TaggedTemplateExpression"));
      }
      return e;
    }),
    (Tr.parseExprAtom = function(e) {
      this.type === Zi.slash && this.readRegexp();
      var t,
        s = this.potentialArrowAt === this.start;
      switch (this.type) {
        case Zi._super:
          return (
            this.allowSuper ||
              this.raise(this.start, "'super' keyword outside a method"),
            (t = this.startNode()),
            this.next(),
            this.type !== Zi.parenL ||
              this.allowDirectSuper ||
              this.raise(
                t.start,
                "super() call outside constructor of a subclass"
              ),
            this.type !== Zi.dot &&
              this.type !== Zi.bracketL &&
              this.type !== Zi.parenL &&
              this.unexpected(),
            this.finishNode(t, "Super")
          );
        case Zi._this:
          return (
            (t = this.startNode()),
            this.next(),
            this.finishNode(t, "ThisExpression")
          );
        case Zi.name:
          var n = this.start,
            i = this.startLoc,
            r = this.containsEsc,
            a = this.parseIdent(!1);
          if (
            this.options.ecmaVersion >= 8 &&
            !r &&
            "async" === a.name &&
            !this.canInsertSemicolon() &&
            this.eat(Zi._function)
          )
            return this.parseFunction(this.startNodeAt(n, i), 0, !1, !0);
          if (s && !this.canInsertSemicolon()) {
            if (this.eat(Zi.arrow))
              return this.parseArrowExpression(this.startNodeAt(n, i), [a], !1);
            if (
              this.options.ecmaVersion >= 8 &&
              "async" === a.name &&
              this.type === Zi.name &&
              !r
            )
              return (
                (a = this.parseIdent(!1)),
                (!this.canInsertSemicolon() && this.eat(Zi.arrow)) ||
                  this.unexpected(),
                this.parseArrowExpression(this.startNodeAt(n, i), [a], !0)
              );
          }
          return a;
        case Zi.regexp:
          var o = this.value;
          return (
            ((t = this.parseLiteral(o.value)).regex = {
              pattern: o.pattern,
              flags: o.flags,
            }),
            t
          );
        case Zi.num:
        case Zi.string:
          return this.parseLiteral(this.value);
        case Zi._null:
        case Zi._true:
        case Zi._false:
          return (
            ((t = this.startNode()).value =
              this.type === Zi._null ? null : this.type === Zi._true),
            (t.raw = this.type.keyword),
            this.next(),
            this.finishNode(t, "Literal")
          );
        case Zi.parenL:
          var h = this.start,
            l = this.parseParenAndDistinguishExpression(s);
          return (
            e &&
              (e.parenthesizedAssign < 0 &&
                !this.isSimpleAssignTarget(l) &&
                (e.parenthesizedAssign = h),
              e.parenthesizedBind < 0 && (e.parenthesizedBind = h)),
            l
          );
        case Zi.bracketL:
          return (
            (t = this.startNode()),
            this.next(),
            (t.elements = this.parseExprList(Zi.bracketR, !0, !0, e)),
            this.finishNode(t, "ArrayExpression")
          );
        case Zi.braceL:
          return this.parseObj(!1, e);
        case Zi._function:
          return (t = this.startNode()), this.next(), this.parseFunction(t, 0);
        case Zi._class:
          return this.parseClass(this.startNode(), !1);
        case Zi._new:
          return this.parseNew();
        case Zi.backQuote:
          return this.parseTemplate();
        case Zi._import:
          return this.options.ecmaVersion >= 11
            ? this.parseExprImport()
            : this.unexpected();
        default:
          this.unexpected();
      }
    }),
    (Tr.parseExprImport = function() {
      var e = this.startNode();
      switch ((this.next(), this.type)) {
        case Zi.parenL:
          return this.parseDynamicImport(e);
        default:
          this.unexpected();
      }
    }),
    (Tr.parseDynamicImport = function(e) {
      if (
        (this.next(),
        (e.source = this.parseMaybeAssign()),
        !this.eat(Zi.parenR))
      ) {
        var t = this.start;
        this.eat(Zi.comma) && this.eat(Zi.parenR)
          ? this.raiseRecoverable(
              t,
              "Trailing comma is not allowed in import()"
            )
          : this.unexpected(t);
      }
      return this.finishNode(e, "ImportExpression");
    }),
    (Tr.parseLiteral = function(e) {
      var t = this.startNode();
      return (
        (t.value = e),
        (t.raw = this.input.slice(this.start, this.end)),
        110 === t.raw.charCodeAt(t.raw.length - 1) &&
          (t.bigint = t.raw.slice(0, -1)),
        this.next(),
        this.finishNode(t, "Literal")
      );
    }),
    (Tr.parseParenExpression = function() {
      this.expect(Zi.parenL);
      var e = this.parseExpression();
      return this.expect(Zi.parenR), e;
    }),
    (Tr.parseParenAndDistinguishExpression = function(e) {
      var t,
        s = this.start,
        n = this.startLoc,
        i = this.options.ecmaVersion >= 8;
      if (this.options.ecmaVersion >= 6) {
        this.next();
        var r,
          a = this.start,
          o = this.startLoc,
          h = [],
          l = !0,
          c = !1,
          u = new kr(),
          d = this.yieldPos,
          p = this.awaitPos;
        for (this.yieldPos = 0, this.awaitPos = 0; this.type !== Zi.parenR; ) {
          if (
            (l ? (l = !1) : this.expect(Zi.comma),
            i && this.afterTrailingComma(Zi.parenR, !0))
          ) {
            c = !0;
            break;
          }
          if (this.type === Zi.ellipsis) {
            (r = this.start),
              h.push(this.parseParenItem(this.parseRestBinding())),
              this.type === Zi.comma &&
                this.raise(
                  this.start,
                  "Comma is not permitted after the rest element"
                );
            break;
          }
          h.push(this.parseMaybeAssign(!1, u, this.parseParenItem));
        }
        var f = this.start,
          m = this.startLoc;
        if (
          (this.expect(Zi.parenR),
          e && !this.canInsertSemicolon() && this.eat(Zi.arrow))
        )
          return (
            this.checkPatternErrors(u, !1),
            this.checkYieldAwaitInDefaultParams(),
            (this.yieldPos = d),
            (this.awaitPos = p),
            this.parseParenArrowList(s, n, h)
          );
        (h.length && !c) || this.unexpected(this.lastTokStart),
          r && this.unexpected(r),
          this.checkExpressionErrors(u, !0),
          (this.yieldPos = d || this.yieldPos),
          (this.awaitPos = p || this.awaitPos),
          h.length > 1
            ? (((t = this.startNodeAt(a, o)).expressions = h),
              this.finishNodeAt(t, "SequenceExpression", f, m))
            : (t = h[0]);
      } else t = this.parseParenExpression();
      if (this.options.preserveParens) {
        var g = this.startNodeAt(s, n);
        return (
          (g.expression = t), this.finishNode(g, "ParenthesizedExpression")
        );
      }
      return t;
    }),
    (Tr.parseParenItem = function(e) {
      return e;
    }),
    (Tr.parseParenArrowList = function(e, t, s) {
      return this.parseArrowExpression(this.startNodeAt(e, t), s);
    });
  var Rr = [];
  (Tr.parseNew = function() {
    var e = this.startNode(),
      t = this.parseIdent(!0);
    if (this.options.ecmaVersion >= 6 && this.eat(Zi.dot)) {
      e.meta = t;
      var s = this.containsEsc;
      return (
        (e.property = this.parseIdent(!0)),
        ("target" !== e.property.name || s) &&
          this.raiseRecoverable(
            e.property.start,
            "The only valid meta property for new is new.target"
          ),
        this.inNonArrowFunction() ||
          this.raiseRecoverable(
            e.start,
            "new.target can only be used in functions"
          ),
        this.finishNode(e, "MetaProperty")
      );
    }
    var n = this.start,
      i = this.startLoc,
      r = this.type === Zi._import;
    return (
      (e.callee = this.parseSubscripts(this.parseExprAtom(), n, i, !0)),
      r &&
        "ImportExpression" === e.callee.type &&
        this.raise(n, "Cannot use new with import()"),
      this.eat(Zi.parenL)
        ? (e.arguments = this.parseExprList(
            Zi.parenR,
            this.options.ecmaVersion >= 8,
            !1
          ))
        : (e.arguments = Rr),
      this.finishNode(e, "NewExpression")
    );
  }),
    (Tr.parseTemplateElement = function(e) {
      var t = e.isTagged,
        s = this.startNode();
      return (
        this.type === Zi.invalidTemplate
          ? (t ||
              this.raiseRecoverable(
                this.start,
                "Bad escape sequence in untagged template literal"
              ),
            (s.value = { raw: this.value, cooked: null }))
          : (s.value = {
              raw: this.input
                .slice(this.start, this.end)
                .replace(/\r\n?/g, "\n"),
              cooked: this.value,
            }),
        this.next(),
        (s.tail = this.type === Zi.backQuote),
        this.finishNode(s, "TemplateElement")
      );
    }),
    (Tr.parseTemplate = function(e) {
      void 0 === e && (e = {});
      var t = e.isTagged;
      void 0 === t && (t = !1);
      var s = this.startNode();
      this.next(), (s.expressions = []);
      var n = this.parseTemplateElement({ isTagged: t });
      for (s.quasis = [n]; !n.tail; )
        this.type === Zi.eof &&
          this.raise(this.pos, "Unterminated template literal"),
          this.expect(Zi.dollarBraceL),
          s.expressions.push(this.parseExpression()),
          this.expect(Zi.braceR),
          s.quasis.push((n = this.parseTemplateElement({ isTagged: t })));
      return this.next(), this.finishNode(s, "TemplateLiteral");
    }),
    (Tr.isAsyncProp = function(e) {
      return (
        !e.computed &&
        "Identifier" === e.key.type &&
        "async" === e.key.name &&
        (this.type === Zi.name ||
          this.type === Zi.num ||
          this.type === Zi.string ||
          this.type === Zi.bracketL ||
          this.type.keyword ||
          (this.options.ecmaVersion >= 9 && this.type === Zi.star)) &&
        !er.test(this.input.slice(this.lastTokEnd, this.start))
      );
    }),
    (Tr.parseObj = function(e, t) {
      var s = this.startNode(),
        n = !0,
        i = {};
      for (s.properties = [], this.next(); !this.eat(Zi.braceR); ) {
        if (n) n = !1;
        else if (
          (this.expect(Zi.comma),
          this.options.ecmaVersion >= 5 && this.afterTrailingComma(Zi.braceR))
        )
          break;
        var r = this.parseProperty(e, t);
        e || this.checkPropClash(r, i, t), s.properties.push(r);
      }
      return this.finishNode(s, e ? "ObjectPattern" : "ObjectExpression");
    }),
    (Tr.parseProperty = function(e, t) {
      var s,
        n,
        i,
        r,
        a = this.startNode();
      if (this.options.ecmaVersion >= 9 && this.eat(Zi.ellipsis))
        return e
          ? ((a.argument = this.parseIdent(!1)),
            this.type === Zi.comma &&
              this.raise(
                this.start,
                "Comma is not permitted after the rest element"
              ),
            this.finishNode(a, "RestElement"))
          : (this.type === Zi.parenL &&
              t &&
              (t.parenthesizedAssign < 0 &&
                (t.parenthesizedAssign = this.start),
              t.parenthesizedBind < 0 && (t.parenthesizedBind = this.start)),
            (a.argument = this.parseMaybeAssign(!1, t)),
            this.type === Zi.comma &&
              t &&
              t.trailingComma < 0 &&
              (t.trailingComma = this.start),
            this.finishNode(a, "SpreadElement"));
      this.options.ecmaVersion >= 6 &&
        ((a.method = !1),
        (a.shorthand = !1),
        (e || t) && ((i = this.start), (r = this.startLoc)),
        e || (s = this.eat(Zi.star)));
      var o = this.containsEsc;
      return (
        this.parsePropertyName(a),
        !e && !o && this.options.ecmaVersion >= 8 && !s && this.isAsyncProp(a)
          ? ((n = !0),
            (s = this.options.ecmaVersion >= 9 && this.eat(Zi.star)),
            this.parsePropertyName(a, t))
          : (n = !1),
        this.parsePropertyValue(a, e, s, n, i, r, t, o),
        this.finishNode(a, "Property")
      );
    }),
    (Tr.parsePropertyValue = function(e, t, s, n, i, r, a, o) {
      if (
        ((s || n) && this.type === Zi.colon && this.unexpected(),
        this.eat(Zi.colon))
      )
        (e.value = t
          ? this.parseMaybeDefault(this.start, this.startLoc)
          : this.parseMaybeAssign(!1, a)),
          (e.kind = "init");
      else if (this.options.ecmaVersion >= 6 && this.type === Zi.parenL)
        t && this.unexpected(),
          (e.kind = "init"),
          (e.method = !0),
          (e.value = this.parseMethod(s, n));
      else if (
        t ||
        o ||
        !(this.options.ecmaVersion >= 5) ||
        e.computed ||
        "Identifier" !== e.key.type ||
        ("get" !== e.key.name && "set" !== e.key.name) ||
        this.type === Zi.comma ||
        this.type === Zi.braceR
      )
        this.options.ecmaVersion >= 6 &&
        !e.computed &&
        "Identifier" === e.key.type
          ? ((s || n) && this.unexpected(),
            this.checkUnreserved(e.key),
            "await" !== e.key.name ||
              this.awaitIdentPos ||
              (this.awaitIdentPos = i),
            (e.kind = "init"),
            t
              ? (e.value = this.parseMaybeDefault(i, r, e.key))
              : this.type === Zi.eq && a
              ? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start),
                (e.value = this.parseMaybeDefault(i, r, e.key)))
              : (e.value = e.key),
            (e.shorthand = !0))
          : this.unexpected();
      else {
        (s || n) && this.unexpected(),
          (e.kind = e.key.name),
          this.parsePropertyName(e),
          (e.value = this.parseMethod(!1));
        var h = "get" === e.kind ? 0 : 1;
        if (e.value.params.length !== h) {
          var l = e.value.start;
          "get" === e.kind
            ? this.raiseRecoverable(l, "getter should have no params")
            : this.raiseRecoverable(l, "setter should have exactly one param");
        } else
          "set" === e.kind &&
            "RestElement" === e.value.params[0].type &&
            this.raiseRecoverable(
              e.value.params[0].start,
              "Setter cannot use rest params"
            );
      }
    }),
    (Tr.parsePropertyName = function(e) {
      if (this.options.ecmaVersion >= 6) {
        if (this.eat(Zi.bracketL))
          return (
            (e.computed = !0),
            (e.key = this.parseMaybeAssign()),
            this.expect(Zi.bracketR),
            e.key
          );
        e.computed = !1;
      }
      return (e.key =
        this.type === Zi.num || this.type === Zi.string
          ? this.parseExprAtom()
          : this.parseIdent("never" !== this.options.allowReserved));
    }),
    (Tr.initFunction = function(e) {
      (e.id = null),
        this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1),
        this.options.ecmaVersion >= 8 && (e.async = !1);
    }),
    (Tr.parseMethod = function(e, t, s) {
      var n = this.startNode(),
        i = this.yieldPos,
        r = this.awaitPos,
        a = this.awaitIdentPos;
      return (
        this.initFunction(n),
        this.options.ecmaVersion >= 6 && (n.generator = e),
        this.options.ecmaVersion >= 8 && (n.async = !!t),
        (this.yieldPos = 0),
        (this.awaitPos = 0),
        (this.awaitIdentPos = 0),
        this.enterScope(64 | br(t, n.generator) | (s ? 128 : 0)),
        this.expect(Zi.parenL),
        (n.params = this.parseBindingList(
          Zi.parenR,
          !1,
          this.options.ecmaVersion >= 8
        )),
        this.checkYieldAwaitInDefaultParams(),
        this.parseFunctionBody(n, !1, !0),
        (this.yieldPos = i),
        (this.awaitPos = r),
        (this.awaitIdentPos = a),
        this.finishNode(n, "FunctionExpression")
      );
    }),
    (Tr.parseArrowExpression = function(e, t, s) {
      var n = this.yieldPos,
        i = this.awaitPos,
        r = this.awaitIdentPos;
      return (
        this.enterScope(16 | br(s, !1)),
        this.initFunction(e),
        this.options.ecmaVersion >= 8 && (e.async = !!s),
        (this.yieldPos = 0),
        (this.awaitPos = 0),
        (this.awaitIdentPos = 0),
        (e.params = this.toAssignableList(t, !0)),
        this.parseFunctionBody(e, !0, !1),
        (this.yieldPos = n),
        (this.awaitPos = i),
        (this.awaitIdentPos = r),
        this.finishNode(e, "ArrowFunctionExpression")
      );
    }),
    (Tr.parseFunctionBody = function(e, t, s) {
      var n = t && this.type !== Zi.braceL,
        i = this.strict,
        r = !1;
      if (n)
        (e.body = this.parseMaybeAssign()),
          (e.expression = !0),
          this.checkParams(e, !1);
      else {
        var a =
          this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
        (i && !a) ||
          ((r = this.strictDirective(this.end)) &&
            a &&
            this.raiseRecoverable(
              e.start,
              "Illegal 'use strict' directive in function with non-simple parameter list"
            ));
        var o = this.labels;
        (this.labels = []),
          r && (this.strict = !0),
          this.checkParams(
            e,
            !i && !r && !t && !s && this.isSimpleParamList(e.params)
          ),
          (e.body = this.parseBlock(!1)),
          (e.expression = !1),
          this.adaptDirectivePrologue(e.body.body),
          (this.labels = o);
      }
      this.exitScope(),
        this.strict && e.id && this.checkLVal(e.id, 5),
        (this.strict = i);
    }),
    (Tr.isSimpleParamList = function(e) {
      for (var t = 0, s = e; t < s.length; t += 1) {
        if ("Identifier" !== s[t].type) return !1;
      }
      return !0;
    }),
    (Tr.checkParams = function(e, t) {
      for (var s = {}, n = 0, i = e.params; n < i.length; n += 1) {
        var r = i[n];
        this.checkLVal(r, 1, t ? null : s);
      }
    }),
    (Tr.parseExprList = function(e, t, s, n) {
      for (var i = [], r = !0; !this.eat(e); ) {
        if (r) r = !1;
        else if ((this.expect(Zi.comma), t && this.afterTrailingComma(e)))
          break;
        var a = void 0;
        s && this.type === Zi.comma
          ? (a = null)
          : this.type === Zi.ellipsis
          ? ((a = this.parseSpread(n)),
            n &&
              this.type === Zi.comma &&
              n.trailingComma < 0 &&
              (n.trailingComma = this.start))
          : (a = this.parseMaybeAssign(!1, n)),
          i.push(a);
      }
      return i;
    }),
    (Tr.checkUnreserved = function(e) {
      var t = e.start,
        s = e.end,
        n = e.name;
      (this.inGenerator &&
        "yield" === n &&
        this.raiseRecoverable(
          t,
          "Cannot use 'yield' as identifier inside a generator"
        ),
      this.inAsync &&
        "await" === n &&
        this.raiseRecoverable(
          t,
          "Cannot use 'await' as identifier inside an async function"
        ),
      this.keywords.test(n) && this.raise(t, "Unexpected keyword '" + n + "'"),
      this.options.ecmaVersion < 6 &&
        -1 !== this.input.slice(t, s).indexOf("\\")) ||
        ((this.strict ? this.reservedWordsStrict : this.reservedWords).test(
          n
        ) &&
          (this.inAsync ||
            "await" !== n ||
            this.raiseRecoverable(
              t,
              "Cannot use keyword 'await' outside an async function"
            ),
          this.raiseRecoverable(t, "The keyword '" + n + "' is reserved")));
    }),
    (Tr.parseIdent = function(e, t) {
      var s = this.startNode();
      return (
        this.type === Zi.name
          ? (s.name = this.value)
          : this.type.keyword
          ? ((s.name = this.type.keyword),
            ("class" !== s.name && "function" !== s.name) ||
              (this.lastTokEnd === this.lastTokStart + 1 &&
                46 === this.input.charCodeAt(this.lastTokStart)) ||
              this.context.pop())
          : this.unexpected(),
        this.next(),
        this.finishNode(s, "Identifier"),
        e ||
          (this.checkUnreserved(s),
          "await" !== s.name ||
            this.awaitIdentPos ||
            (this.awaitIdentPos = s.start)),
        s
      );
    }),
    (Tr.parseYield = function(e) {
      this.yieldPos || (this.yieldPos = this.start);
      var t = this.startNode();
      return (
        this.next(),
        this.type === Zi.semi ||
        this.canInsertSemicolon() ||
        (this.type !== Zi.star && !this.type.startsExpr)
          ? ((t.delegate = !1), (t.argument = null))
          : ((t.delegate = this.eat(Zi.star)),
            (t.argument = this.parseMaybeAssign(e))),
        this.finishNode(t, "YieldExpression")
      );
    }),
    (Tr.parseAwait = function() {
      this.awaitPos || (this.awaitPos = this.start);
      var e = this.startNode();
      return (
        this.next(),
        (e.argument = this.parseMaybeUnary(null, !0)),
        this.finishNode(e, "AwaitExpression")
      );
    });
  var Mr = vr.prototype;
  (Mr.raise = function(e, t) {
    var s = pr(this.input, e);
    t += " (" + s.line + ":" + s.column + ")";
    var n = new SyntaxError(t);
    throw ((n.pos = e), (n.loc = s), (n.raisedAt = this.pos), n);
  }),
    (Mr.raiseRecoverable = Mr.raise),
    (Mr.curPosition = function() {
      if (this.options.locations)
        return new ur(this.curLine, this.pos - this.lineStart);
    });
  var Or = vr.prototype,
    Dr = function(e) {
      (this.flags = e),
        (this.var = []),
        (this.lexical = []),
        (this.functions = []);
    };
  (Or.enterScope = function(e) {
    this.scopeStack.push(new Dr(e));
  }),
    (Or.exitScope = function() {
      this.scopeStack.pop();
    }),
    (Or.treatFunctionsAsVarInScope = function(e) {
      return e.flags & gr || (!this.inModule && 1 & e.flags);
    }),
    (Or.declareName = function(e, t, s) {
      var n = !1;
      if (2 === t) {
        var i = this.currentScope();
        (n =
          i.lexical.indexOf(e) > -1 ||
          i.functions.indexOf(e) > -1 ||
          i.var.indexOf(e) > -1),
          i.lexical.push(e),
          this.inModule && 1 & i.flags && delete this.undefinedExports[e];
      } else if (4 === t) {
        this.currentScope().lexical.push(e);
      } else if (3 === t) {
        var r = this.currentScope();
        (n = this.treatFunctionsAsVar
          ? r.lexical.indexOf(e) > -1
          : r.lexical.indexOf(e) > -1 || r.var.indexOf(e) > -1),
          r.functions.push(e);
      } else
        for (var a = this.scopeStack.length - 1; a >= 0; --a) {
          var o = this.scopeStack[a];
          if (
            (o.lexical.indexOf(e) > -1 &&
              !(32 & o.flags && o.lexical[0] === e)) ||
            (!this.treatFunctionsAsVarInScope(o) && o.functions.indexOf(e) > -1)
          ) {
            n = !0;
            break;
          }
          if (
            (o.var.push(e),
            this.inModule && 1 & o.flags && delete this.undefinedExports[e],
            o.flags & xr)
          )
            break;
        }
      n &&
        this.raiseRecoverable(
          s,
          "Identifier '" + e + "' has already been declared"
        );
    }),
    (Or.checkLocalExport = function(e) {
      -1 === this.scopeStack[0].lexical.indexOf(e.name) &&
        -1 === this.scopeStack[0].var.indexOf(e.name) &&
        (this.undefinedExports[e.name] = e);
    }),
    (Or.currentScope = function() {
      return this.scopeStack[this.scopeStack.length - 1];
    }),
    (Or.currentVarScope = function() {
      for (var e = this.scopeStack.length - 1; ; e--) {
        var t = this.scopeStack[e];
        if (t.flags & xr) return t;
      }
    }),
    (Or.currentThisScope = function() {
      for (var e = this.scopeStack.length - 1; ; e--) {
        var t = this.scopeStack[e];
        if (t.flags & xr && !(16 & t.flags)) return t;
      }
    });
  var Vr = function(e, t, s) {
      (this.type = ""),
        (this.start = t),
        (this.end = 0),
        e.options.locations && (this.loc = new dr(e, s)),
        e.options.directSourceFile &&
          (this.sourceFile = e.options.directSourceFile),
        e.options.ranges && (this.range = [t, 0]);
    },
    Br = vr.prototype;
  function Fr(e, t, s, n) {
    return (
      (e.type = t),
      (e.end = s),
      this.options.locations && (e.loc.end = n),
      this.options.ranges && (e.range[1] = s),
      e
    );
  }
  (Br.startNode = function() {
    return new Vr(this, this.start, this.startLoc);
  }),
    (Br.startNodeAt = function(e, t) {
      return new Vr(this, e, t);
    }),
    (Br.finishNode = function(e, t) {
      return Fr.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
    }),
    (Br.finishNodeAt = function(e, t, s, n) {
      return Fr.call(this, e, t, s, n);
    });
  var Wr = function(e, t, s, n, i) {
      (this.token = e),
        (this.isExpr = !!t),
        (this.preserveSpace = !!s),
        (this.override = n),
        (this.generator = !!i);
    },
    jr = {
      b_stat: new Wr("{", !1),
      b_expr: new Wr("{", !0),
      b_tmpl: new Wr("${", !1),
      p_stat: new Wr("(", !1),
      p_expr: new Wr("(", !0),
      q_tmpl: new Wr("`", !0, !0, function(e) {
        return e.tryReadTemplateToken();
      }),
      f_stat: new Wr("function", !1),
      f_expr: new Wr("function", !0),
      f_expr_gen: new Wr("function", !0, !1, null, !0),
      f_gen: new Wr("function", !1, !1, null, !0),
    },
    Ur = vr.prototype;
  (Ur.initialContext = function() {
    return [jr.b_stat];
  }),
    (Ur.braceIsBlock = function(e) {
      var t = this.curContext();
      return (
        t === jr.f_expr ||
        t === jr.f_stat ||
        (e !== Zi.colon || (t !== jr.b_stat && t !== jr.b_expr)
          ? e === Zi._return || (e === Zi.name && this.exprAllowed)
            ? er.test(this.input.slice(this.lastTokEnd, this.start))
            : e === Zi._else ||
              e === Zi.semi ||
              e === Zi.eof ||
              e === Zi.parenR ||
              e === Zi.arrow ||
              (e === Zi.braceL
                ? t === jr.b_stat
                : e !== Zi._var &&
                  e !== Zi._const &&
                  e !== Zi.name &&
                  !this.exprAllowed)
          : !t.isExpr)
      );
    }),
    (Ur.inGeneratorContext = function() {
      for (var e = this.context.length - 1; e >= 1; e--) {
        var t = this.context[e];
        if ("function" === t.token) return t.generator;
      }
      return !1;
    }),
    (Ur.updateContext = function(e) {
      var t,
        s = this.type;
      s.keyword && e === Zi.dot
        ? (this.exprAllowed = !1)
        : (t = s.updateContext)
        ? t.call(this, e)
        : (this.exprAllowed = s.beforeExpr);
    }),
    (Zi.parenR.updateContext = Zi.braceR.updateContext = function() {
      if (1 !== this.context.length) {
        var e = this.context.pop();
        e === jr.b_stat &&
          "function" === this.curContext().token &&
          (e = this.context.pop()),
          (this.exprAllowed = !e.isExpr);
      } else this.exprAllowed = !0;
    }),
    (Zi.braceL.updateContext = function(e) {
      this.context.push(this.braceIsBlock(e) ? jr.b_stat : jr.b_expr),
        (this.exprAllowed = !0);
    }),
    (Zi.dollarBraceL.updateContext = function() {
      this.context.push(jr.b_tmpl), (this.exprAllowed = !0);
    }),
    (Zi.parenL.updateContext = function(e) {
      var t =
        e === Zi._if || e === Zi._for || e === Zi._with || e === Zi._while;
      this.context.push(t ? jr.p_stat : jr.p_expr), (this.exprAllowed = !0);
    }),
    (Zi.incDec.updateContext = function() {}),
    (Zi._function.updateContext = Zi._class.updateContext = function(e) {
      !e.beforeExpr ||
      e === Zi.semi ||
      e === Zi._else ||
      (e === Zi._return &&
        er.test(this.input.slice(this.lastTokEnd, this.start))) ||
      ((e === Zi.colon || e === Zi.braceL) && this.curContext() === jr.b_stat)
        ? this.context.push(jr.f_stat)
        : this.context.push(jr.f_expr),
        (this.exprAllowed = !1);
    }),
    (Zi.backQuote.updateContext = function() {
      this.curContext() === jr.q_tmpl
        ? this.context.pop()
        : this.context.push(jr.q_tmpl),
        (this.exprAllowed = !1);
    }),
    (Zi.star.updateContext = function(e) {
      if (e === Zi._function) {
        var t = this.context.length - 1;
        this.context[t] === jr.f_expr
          ? (this.context[t] = jr.f_expr_gen)
          : (this.context[t] = jr.f_gen);
      }
      this.exprAllowed = !0;
    }),
    (Zi.name.updateContext = function(e) {
      var t = !1;
      this.options.ecmaVersion >= 6 &&
        e !== Zi.dot &&
        (("of" === this.value && !this.exprAllowed) ||
          ("yield" === this.value && this.inGeneratorContext())) &&
        (t = !0),
        (this.exprAllowed = t);
    });
  var zr =
      "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",
    Gr = zr + " Extended_Pictographic",
    Hr = {
      9: zr,
      10: Gr,
      11: "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS Extended_Pictographic",
    },
    qr =
      "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",
    Kr =
      "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",
    Yr =
      Kr +
      " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",
    Xr = {
      9: Kr,
      10: Yr,
      11: "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",
    },
    Qr = {};
  function Jr(e) {
    var t = (Qr[e] = {
      binary: cr(Hr[e] + " " + qr),
      nonBinary: { General_Category: cr(qr), Script: cr(Xr[e]) },
    });
    (t.nonBinary.Script_Extensions = t.nonBinary.Script),
      (t.nonBinary.gc = t.nonBinary.General_Category),
      (t.nonBinary.sc = t.nonBinary.Script),
      (t.nonBinary.scx = t.nonBinary.Script_Extensions);
  }
  Jr(9), Jr(10), Jr(11);
  var Zr = vr.prototype,
    ea = function(e) {
      (this.parser = e),
        (this.validFlags =
          "gim" +
          (e.options.ecmaVersion >= 6 ? "uy" : "") +
          (e.options.ecmaVersion >= 9 ? "s" : "")),
        (this.unicodeProperties =
          Qr[e.options.ecmaVersion >= 11 ? 11 : e.options.ecmaVersion]),
        (this.source = ""),
        (this.flags = ""),
        (this.start = 0),
        (this.switchU = !1),
        (this.switchN = !1),
        (this.pos = 0),
        (this.lastIntValue = 0),
        (this.lastStringValue = ""),
        (this.lastAssertionIsQuantifiable = !1),
        (this.numCapturingParens = 0),
        (this.maxBackReference = 0),
        (this.groupNames = []),
        (this.backReferenceNames = []);
    };
  function ta(e) {
    return e <= 65535
      ? String.fromCharCode(e)
      : ((e -= 65536),
        String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)));
  }
  function sa(e) {
    return (
      36 === e ||
      (e >= 40 && e <= 43) ||
      46 === e ||
      63 === e ||
      (e >= 91 && e <= 94) ||
      (e >= 123 && e <= 125)
    );
  }
  function na(e) {
    return (e >= 65 && e <= 90) || (e >= 97 && e <= 122);
  }
  function ia(e) {
    return na(e) || 95 === e;
  }
  function ra(e) {
    return ia(e) || aa(e);
  }
  function aa(e) {
    return e >= 48 && e <= 57;
  }
  function oa(e) {
    return (
      (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102)
    );
  }
  function ha(e) {
    return e >= 65 && e <= 70
      ? e - 65 + 10
      : e >= 97 && e <= 102
      ? e - 97 + 10
      : e - 48;
  }
  function la(e) {
    return e >= 48 && e <= 55;
  }
  (ea.prototype.reset = function(e, t, s) {
    var n = -1 !== s.indexOf("u");
    (this.start = 0 | e),
      (this.source = t + ""),
      (this.flags = s),
      (this.switchU = n && this.parser.options.ecmaVersion >= 6),
      (this.switchN = n && this.parser.options.ecmaVersion >= 9);
  }),
    (ea.prototype.raise = function(e) {
      this.parser.raiseRecoverable(
        this.start,
        "Invalid regular expression: /" + this.source + "/: " + e
      );
    }),
    (ea.prototype.at = function(e) {
      var t = this.source,
        s = t.length;
      if (e >= s) return -1;
      var n = t.charCodeAt(e);
      return !this.switchU || n <= 55295 || n >= 57344 || e + 1 >= s
        ? n
        : (n << 10) + t.charCodeAt(e + 1) - 56613888;
    }),
    (ea.prototype.nextIndex = function(e) {
      var t = this.source,
        s = t.length;
      if (e >= s) return s;
      var n = t.charCodeAt(e);
      return !this.switchU || n <= 55295 || n >= 57344 || e + 1 >= s
        ? e + 1
        : e + 2;
    }),
    (ea.prototype.current = function() {
      return this.at(this.pos);
    }),
    (ea.prototype.lookahead = function() {
      return this.at(this.nextIndex(this.pos));
    }),
    (ea.prototype.advance = function() {
      this.pos = this.nextIndex(this.pos);
    }),
    (ea.prototype.eat = function(e) {
      return this.current() === e && (this.advance(), !0);
    }),
    (Zr.validateRegExpFlags = function(e) {
      for (var t = e.validFlags, s = e.flags, n = 0; n < s.length; n++) {
        var i = s.charAt(n);
        -1 === t.indexOf(i) &&
          this.raise(e.start, "Invalid regular expression flag"),
          s.indexOf(i, n + 1) > -1 &&
            this.raise(e.start, "Duplicate regular expression flag");
      }
    }),
    (Zr.validateRegExpPattern = function(e) {
      this.regexp_pattern(e),
        !e.switchN &&
          this.options.ecmaVersion >= 9 &&
          e.groupNames.length > 0 &&
          ((e.switchN = !0), this.regexp_pattern(e));
    }),
    (Zr.regexp_pattern = function(e) {
      (e.pos = 0),
        (e.lastIntValue = 0),
        (e.lastStringValue = ""),
        (e.lastAssertionIsQuantifiable = !1),
        (e.numCapturingParens = 0),
        (e.maxBackReference = 0),
        (e.groupNames.length = 0),
        (e.backReferenceNames.length = 0),
        this.regexp_disjunction(e),
        e.pos !== e.source.length &&
          (e.eat(41) && e.raise("Unmatched ')'"),
          (e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")),
        e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
      for (var t = 0, s = e.backReferenceNames; t < s.length; t += 1) {
        var n = s[t];
        -1 === e.groupNames.indexOf(n) &&
          e.raise("Invalid named capture referenced");
      }
    }),
    (Zr.regexp_disjunction = function(e) {
      for (this.regexp_alternative(e); e.eat(124); ) this.regexp_alternative(e);
      this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"),
        e.eat(123) && e.raise("Lone quantifier brackets");
    }),
    (Zr.regexp_alternative = function(e) {
      for (; e.pos < e.source.length && this.regexp_eatTerm(e); );
    }),
    (Zr.regexp_eatTerm = function(e) {
      return this.regexp_eatAssertion(e)
        ? (e.lastAssertionIsQuantifiable &&
            this.regexp_eatQuantifier(e) &&
            e.switchU &&
            e.raise("Invalid quantifier"),
          !0)
        : !(e.switchU
            ? !this.regexp_eatAtom(e)
            : !this.regexp_eatExtendedAtom(e)) &&
            (this.regexp_eatQuantifier(e), !0);
    }),
    (Zr.regexp_eatAssertion = function(e) {
      var t = e.pos;
      if (((e.lastAssertionIsQuantifiable = !1), e.eat(94) || e.eat(36)))
        return !0;
      if (e.eat(92)) {
        if (e.eat(66) || e.eat(98)) return !0;
        e.pos = t;
      }
      if (e.eat(40) && e.eat(63)) {
        var s = !1;
        if (
          (this.options.ecmaVersion >= 9 && (s = e.eat(60)),
          e.eat(61) || e.eat(33))
        )
          return (
            this.regexp_disjunction(e),
            e.eat(41) || e.raise("Unterminated group"),
            (e.lastAssertionIsQuantifiable = !s),
            !0
          );
      }
      return (e.pos = t), !1;
    }),
    (Zr.regexp_eatQuantifier = function(e, t) {
      return (
        void 0 === t && (t = !1),
        !!this.regexp_eatQuantifierPrefix(e, t) && (e.eat(63), !0)
      );
    }),
    (Zr.regexp_eatQuantifierPrefix = function(e, t) {
      return (
        e.eat(42) ||
        e.eat(43) ||
        e.eat(63) ||
        this.regexp_eatBracedQuantifier(e, t)
      );
    }),
    (Zr.regexp_eatBracedQuantifier = function(e, t) {
      var s = e.pos;
      if (e.eat(123)) {
        var n = 0,
          i = -1;
        if (
          this.regexp_eatDecimalDigits(e) &&
          ((n = e.lastIntValue),
          e.eat(44) && this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue),
          e.eat(125))
        )
          return (
            -1 !== i &&
              i < n &&
              !t &&
              e.raise("numbers out of order in {} quantifier"),
            !0
          );
        e.switchU && !t && e.raise("Incomplete quantifier"), (e.pos = s);
      }
      return !1;
    }),
    (Zr.regexp_eatAtom = function(e) {
      return (
        this.regexp_eatPatternCharacters(e) ||
        e.eat(46) ||
        this.regexp_eatReverseSolidusAtomEscape(e) ||
        this.regexp_eatCharacterClass(e) ||
        this.regexp_eatUncapturingGroup(e) ||
        this.regexp_eatCapturingGroup(e)
      );
    }),
    (Zr.regexp_eatReverseSolidusAtomEscape = function(e) {
      var t = e.pos;
      if (e.eat(92)) {
        if (this.regexp_eatAtomEscape(e)) return !0;
        e.pos = t;
      }
      return !1;
    }),
    (Zr.regexp_eatUncapturingGroup = function(e) {
      var t = e.pos;
      if (e.eat(40)) {
        if (e.eat(63) && e.eat(58)) {
          if ((this.regexp_disjunction(e), e.eat(41))) return !0;
          e.raise("Unterminated group");
        }
        e.pos = t;
      }
      return !1;
    }),
    (Zr.regexp_eatCapturingGroup = function(e) {
      if (e.eat(40)) {
        if (
          (this.options.ecmaVersion >= 9
            ? this.regexp_groupSpecifier(e)
            : 63 === e.current() && e.raise("Invalid group"),
          this.regexp_disjunction(e),
          e.eat(41))
        )
          return (e.numCapturingParens += 1), !0;
        e.raise("Unterminated group");
      }
      return !1;
    }),
    (Zr.regexp_eatExtendedAtom = function(e) {
      return (
        e.eat(46) ||
        this.regexp_eatReverseSolidusAtomEscape(e) ||
        this.regexp_eatCharacterClass(e) ||
        this.regexp_eatUncapturingGroup(e) ||
        this.regexp_eatCapturingGroup(e) ||
        this.regexp_eatInvalidBracedQuantifier(e) ||
        this.regexp_eatExtendedPatternCharacter(e)
      );
    }),
    (Zr.regexp_eatInvalidBracedQuantifier = function(e) {
      return (
        this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"),
        !1
      );
    }),
    (Zr.regexp_eatSyntaxCharacter = function(e) {
      var t = e.current();
      return !!sa(t) && ((e.lastIntValue = t), e.advance(), !0);
    }),
    (Zr.regexp_eatPatternCharacters = function(e) {
      for (var t = e.pos, s = 0; -1 !== (s = e.current()) && !sa(s); )
        e.advance();
      return e.pos !== t;
    }),
    (Zr.regexp_eatExtendedPatternCharacter = function(e) {
      var t = e.current();
      return (
        !(
          -1 === t ||
          36 === t ||
          (t >= 40 && t <= 43) ||
          46 === t ||
          63 === t ||
          91 === t ||
          94 === t ||
          124 === t
        ) && (e.advance(), !0)
      );
    }),
    (Zr.regexp_groupSpecifier = function(e) {
      if (e.eat(63)) {
        if (this.regexp_eatGroupName(e))
          return (
            -1 !== e.groupNames.indexOf(e.lastStringValue) &&
              e.raise("Duplicate capture group name"),
            void e.groupNames.push(e.lastStringValue)
          );
        e.raise("Invalid group");
      }
    }),
    (Zr.regexp_eatGroupName = function(e) {
      if (((e.lastStringValue = ""), e.eat(60))) {
        if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
        e.raise("Invalid capture group name");
      }
      return !1;
    }),
    (Zr.regexp_eatRegExpIdentifierName = function(e) {
      if (((e.lastStringValue = ""), this.regexp_eatRegExpIdentifierStart(e))) {
        for (
          e.lastStringValue += ta(e.lastIntValue);
          this.regexp_eatRegExpIdentifierPart(e);

        )
          e.lastStringValue += ta(e.lastIntValue);
        return !0;
      }
      return !1;
    }),
    (Zr.regexp_eatRegExpIdentifierStart = function(e) {
      var t = e.pos,
        s = e.current();
      return (
        e.advance(),
        92 === s &&
          this.regexp_eatRegExpUnicodeEscapeSequence(e) &&
          (s = e.lastIntValue),
        (function(e) {
          return Gi(e, !0) || 36 === e || 95 === e;
        })(s)
          ? ((e.lastIntValue = s), !0)
          : ((e.pos = t), !1)
      );
    }),
    (Zr.regexp_eatRegExpIdentifierPart = function(e) {
      var t = e.pos,
        s = e.current();
      return (
        e.advance(),
        92 === s &&
          this.regexp_eatRegExpUnicodeEscapeSequence(e) &&
          (s = e.lastIntValue),
        (function(e) {
          return Hi(e, !0) || 36 === e || 95 === e || 8204 === e || 8205 === e;
        })(s)
          ? ((e.lastIntValue = s), !0)
          : ((e.pos = t), !1)
      );
    }),
    (Zr.regexp_eatAtomEscape = function(e) {
      return (
        !!(
          this.regexp_eatBackReference(e) ||
          this.regexp_eatCharacterClassEscape(e) ||
          this.regexp_eatCharacterEscape(e) ||
          (e.switchN && this.regexp_eatKGroupName(e))
        ) ||
        (e.switchU &&
          (99 === e.current() && e.raise("Invalid unicode escape"),
          e.raise("Invalid escape")),
        !1)
      );
    }),
    (Zr.regexp_eatBackReference = function(e) {
      var t = e.pos;
      if (this.regexp_eatDecimalEscape(e)) {
        var s = e.lastIntValue;
        if (e.switchU)
          return s > e.maxBackReference && (e.maxBackReference = s), !0;
        if (s <= e.numCapturingParens) return !0;
        e.pos = t;
      }
      return !1;
    }),
    (Zr.regexp_eatKGroupName = function(e) {
      if (e.eat(107)) {
        if (this.regexp_eatGroupName(e))
          return e.backReferenceNames.push(e.lastStringValue), !0;
        e.raise("Invalid named reference");
      }
      return !1;
    }),
    (Zr.regexp_eatCharacterEscape = function(e) {
      return (
        this.regexp_eatControlEscape(e) ||
        this.regexp_eatCControlLetter(e) ||
        this.regexp_eatZero(e) ||
        this.regexp_eatHexEscapeSequence(e) ||
        this.regexp_eatRegExpUnicodeEscapeSequence(e) ||
        (!e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e)) ||
        this.regexp_eatIdentityEscape(e)
      );
    }),
    (Zr.regexp_eatCControlLetter = function(e) {
      var t = e.pos;
      if (e.eat(99)) {
        if (this.regexp_eatControlLetter(e)) return !0;
        e.pos = t;
      }
      return !1;
    }),
    (Zr.regexp_eatZero = function(e) {
      return (
        48 === e.current() &&
        !aa(e.lookahead()) &&
        ((e.lastIntValue = 0), e.advance(), !0)
      );
    }),
    (Zr.regexp_eatControlEscape = function(e) {
      var t = e.current();
      return 116 === t
        ? ((e.lastIntValue = 9), e.advance(), !0)
        : 110 === t
        ? ((e.lastIntValue = 10), e.advance(), !0)
        : 118 === t
        ? ((e.lastIntValue = 11), e.advance(), !0)
        : 102 === t
        ? ((e.lastIntValue = 12), e.advance(), !0)
        : 114 === t && ((e.lastIntValue = 13), e.advance(), !0);
    }),
    (Zr.regexp_eatControlLetter = function(e) {
      var t = e.current();
      return !!na(t) && ((e.lastIntValue = t % 32), e.advance(), !0);
    }),
    (Zr.regexp_eatRegExpUnicodeEscapeSequence = function(e) {
      var t,
        s = e.pos;
      if (e.eat(117)) {
        if (this.regexp_eatFixedHexDigits(e, 4)) {
          var n = e.lastIntValue;
          if (e.switchU && n >= 55296 && n <= 56319) {
            var i = e.pos;
            if (
              e.eat(92) &&
              e.eat(117) &&
              this.regexp_eatFixedHexDigits(e, 4)
            ) {
              var r = e.lastIntValue;
              if (r >= 56320 && r <= 57343)
                return (
                  (e.lastIntValue = 1024 * (n - 55296) + (r - 56320) + 65536),
                  !0
                );
            }
            (e.pos = i), (e.lastIntValue = n);
          }
          return !0;
        }
        if (
          e.switchU &&
          e.eat(123) &&
          this.regexp_eatHexDigits(e) &&
          e.eat(125) &&
          (t = e.lastIntValue) >= 0 && t <= 1114111
        )
          return !0;
        e.switchU && e.raise("Invalid unicode escape"), (e.pos = s);
      }
      return !1;
    }),
    (Zr.regexp_eatIdentityEscape = function(e) {
      if (e.switchU)
        return (
          !!this.regexp_eatSyntaxCharacter(e) ||
          (!!e.eat(47) && ((e.lastIntValue = 47), !0))
        );
      var t = e.current();
      return (
        !(99 === t || (e.switchN && 107 === t)) &&
        ((e.lastIntValue = t), e.advance(), !0)
      );
    }),
    (Zr.regexp_eatDecimalEscape = function(e) {
      e.lastIntValue = 0;
      var t = e.current();
      if (t >= 49 && t <= 57) {
        do {
          (e.lastIntValue = 10 * e.lastIntValue + (t - 48)), e.advance();
        } while ((t = e.current()) >= 48 && t <= 57);
        return !0;
      }
      return !1;
    }),
    (Zr.regexp_eatCharacterClassEscape = function(e) {
      var t = e.current();
      if (
        (function(e) {
          return (
            100 === e ||
            68 === e ||
            115 === e ||
            83 === e ||
            119 === e ||
            87 === e
          );
        })(t)
      )
        return (e.lastIntValue = -1), e.advance(), !0;
      if (
        e.switchU &&
        this.options.ecmaVersion >= 9 &&
        (80 === t || 112 === t)
      ) {
        if (
          ((e.lastIntValue = -1),
          e.advance(),
          e.eat(123) &&
            this.regexp_eatUnicodePropertyValueExpression(e) &&
            e.eat(125))
        )
          return !0;
        e.raise("Invalid property name");
      }
      return !1;
    }),
    (Zr.regexp_eatUnicodePropertyValueExpression = function(e) {
      var t = e.pos;
      if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
        var s = e.lastStringValue;
        if (this.regexp_eatUnicodePropertyValue(e)) {
          var n = e.lastStringValue;
          return this.regexp_validateUnicodePropertyNameAndValue(e, s, n), !0;
        }
      }
      if (((e.pos = t), this.regexp_eatLoneUnicodePropertyNameOrValue(e))) {
        var i = e.lastStringValue;
        return this.regexp_validateUnicodePropertyNameOrValue(e, i), !0;
      }
      return !1;
    }),
    (Zr.regexp_validateUnicodePropertyNameAndValue = function(e, t, s) {
      hr(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"),
        e.unicodeProperties.nonBinary[t].test(s) ||
          e.raise("Invalid property value");
    }),
    (Zr.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
      e.unicodeProperties.binary.test(t) || e.raise("Invalid property name");
    }),
    (Zr.regexp_eatUnicodePropertyName = function(e) {
      var t = 0;
      for (e.lastStringValue = ""; ia((t = e.current())); )
        (e.lastStringValue += ta(t)), e.advance();
      return "" !== e.lastStringValue;
    }),
    (Zr.regexp_eatUnicodePropertyValue = function(e) {
      var t = 0;
      for (e.lastStringValue = ""; ra((t = e.current())); )
        (e.lastStringValue += ta(t)), e.advance();
      return "" !== e.lastStringValue;
    }),
    (Zr.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
      return this.regexp_eatUnicodePropertyValue(e);
    }),
    (Zr.regexp_eatCharacterClass = function(e) {
      if (e.eat(91)) {
        if ((e.eat(94), this.regexp_classRanges(e), e.eat(93))) return !0;
        e.raise("Unterminated character class");
      }
      return !1;
    }),
    (Zr.regexp_classRanges = function(e) {
      for (; this.regexp_eatClassAtom(e); ) {
        var t = e.lastIntValue;
        if (e.eat(45) && this.regexp_eatClassAtom(e)) {
          var s = e.lastIntValue;
          !e.switchU ||
            (-1 !== t && -1 !== s) ||
            e.raise("Invalid character class"),
            -1 !== t &&
              -1 !== s &&
              t > s &&
              e.raise("Range out of order in character class");
        }
      }
    }),
    (Zr.regexp_eatClassAtom = function(e) {
      var t = e.pos;
      if (e.eat(92)) {
        if (this.regexp_eatClassEscape(e)) return !0;
        if (e.switchU) {
          var s = e.current();
          (99 === s || la(s)) && e.raise("Invalid class escape"),
            e.raise("Invalid escape");
        }
        e.pos = t;
      }
      var n = e.current();
      return 93 !== n && ((e.lastIntValue = n), e.advance(), !0);
    }),
    (Zr.regexp_eatClassEscape = function(e) {
      var t = e.pos;
      if (e.eat(98)) return (e.lastIntValue = 8), !0;
      if (e.switchU && e.eat(45)) return (e.lastIntValue = 45), !0;
      if (!e.switchU && e.eat(99)) {
        if (this.regexp_eatClassControlLetter(e)) return !0;
        e.pos = t;
      }
      return (
        this.regexp_eatCharacterClassEscape(e) ||
        this.regexp_eatCharacterEscape(e)
      );
    }),
    (Zr.regexp_eatClassControlLetter = function(e) {
      var t = e.current();
      return (
        !(!aa(t) && 95 !== t) && ((e.lastIntValue = t % 32), e.advance(), !0)
      );
    }),
    (Zr.regexp_eatHexEscapeSequence = function(e) {
      var t = e.pos;
      if (e.eat(120)) {
        if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
        e.switchU && e.raise("Invalid escape"), (e.pos = t);
      }
      return !1;
    }),
    (Zr.regexp_eatDecimalDigits = function(e) {
      var t = e.pos,
        s = 0;
      for (e.lastIntValue = 0; aa((s = e.current())); )
        (e.lastIntValue = 10 * e.lastIntValue + (s - 48)), e.advance();
      return e.pos !== t;
    }),
    (Zr.regexp_eatHexDigits = function(e) {
      var t = e.pos,
        s = 0;
      for (e.lastIntValue = 0; oa((s = e.current())); )
        (e.lastIntValue = 16 * e.lastIntValue + ha(s)), e.advance();
      return e.pos !== t;
    }),
    (Zr.regexp_eatLegacyOctalEscapeSequence = function(e) {
      if (this.regexp_eatOctalDigit(e)) {
        var t = e.lastIntValue;
        if (this.regexp_eatOctalDigit(e)) {
          var s = e.lastIntValue;
          t <= 3 && this.regexp_eatOctalDigit(e)
            ? (e.lastIntValue = 64 * t + 8 * s + e.lastIntValue)
            : (e.lastIntValue = 8 * t + s);
        } else e.lastIntValue = t;
        return !0;
      }
      return !1;
    }),
    (Zr.regexp_eatOctalDigit = function(e) {
      var t = e.current();
      return la(t)
        ? ((e.lastIntValue = t - 48), e.advance(), !0)
        : ((e.lastIntValue = 0), !1);
    }),
    (Zr.regexp_eatFixedHexDigits = function(e, t) {
      var s = e.pos;
      e.lastIntValue = 0;
      for (var n = 0; n < t; ++n) {
        var i = e.current();
        if (!oa(i)) return (e.pos = s), !1;
        (e.lastIntValue = 16 * e.lastIntValue + ha(i)), e.advance();
      }
      return !0;
    });
  var ca = function(e) {
      (this.type = e.type),
        (this.value = e.value),
        (this.start = e.start),
        (this.end = e.end),
        e.options.locations && (this.loc = new dr(e, e.startLoc, e.endLoc)),
        e.options.ranges && (this.range = [e.start, e.end]);
    },
    ua = vr.prototype;
  function da(e) {
    return e <= 65535
      ? String.fromCharCode(e)
      : ((e -= 65536),
        String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)));
  }
  (ua.next = function() {
    this.options.onToken && this.options.onToken(new ca(this)),
      (this.lastTokEnd = this.end),
      (this.lastTokStart = this.start),
      (this.lastTokEndLoc = this.endLoc),
      (this.lastTokStartLoc = this.startLoc),
      this.nextToken();
  }),
    (ua.getToken = function() {
      return this.next(), new ca(this);
    }),
    "undefined" != typeof Symbol &&
      (ua[Symbol.iterator] = function() {
        var e = this;
        return {
          next: function() {
            var t = e.getToken();
            return { done: t.type === Zi.eof, value: t };
          },
        };
      }),
    (ua.curContext = function() {
      return this.context[this.context.length - 1];
    }),
    (ua.nextToken = function() {
      var e = this.curContext();
      return (
        (e && e.preserveSpace) || this.skipSpace(),
        (this.start = this.pos),
        this.options.locations && (this.startLoc = this.curPosition()),
        this.pos >= this.input.length
          ? this.finishToken(Zi.eof)
          : e.override
          ? e.override(this)
          : void this.readToken(this.fullCharCodeAtPos())
      );
    }),
    (ua.readToken = function(e) {
      return Gi(e, this.options.ecmaVersion >= 6) || 92 === e
        ? this.readWord()
        : this.getTokenFromCode(e);
    }),
    (ua.fullCharCodeAtPos = function() {
      var e = this.input.charCodeAt(this.pos);
      return e <= 55295 || e >= 57344
        ? e
        : (e << 10) + this.input.charCodeAt(this.pos + 1) - 56613888;
    }),
    (ua.skipBlockComment = function() {
      var e,
        t = this.options.onComment && this.curPosition(),
        s = this.pos,
        n = this.input.indexOf("*/", (this.pos += 2));
      if (
        (-1 === n && this.raise(this.pos - 2, "Unterminated comment"),
        (this.pos = n + 2),
        this.options.locations)
      )
        for (
          tr.lastIndex = s;
          (e = tr.exec(this.input)) && e.index < this.pos;

        )
          ++this.curLine, (this.lineStart = e.index + e[0].length);
      this.options.onComment &&
        this.options.onComment(
          !0,
          this.input.slice(s + 2, n),
          s,
          this.pos,
          t,
          this.curPosition()
        );
    }),
    (ua.skipLineComment = function(e) {
      for (
        var t = this.pos,
          s = this.options.onComment && this.curPosition(),
          n = this.input.charCodeAt((this.pos += e));
        this.pos < this.input.length && !sr(n);

      )
        n = this.input.charCodeAt(++this.pos);
      this.options.onComment &&
        this.options.onComment(
          !1,
          this.input.slice(t + e, this.pos),
          t,
          this.pos,
          s,
          this.curPosition()
        );
    }),
    (ua.skipSpace = function() {
      e: for (; this.pos < this.input.length; ) {
        var e = this.input.charCodeAt(this.pos);
        switch (e) {
          case 32:
          case 160:
            ++this.pos;
            break;
          case 13:
            10 === this.input.charCodeAt(this.pos + 1) && ++this.pos;
          case 10:
          case 8232:
          case 8233:
            ++this.pos,
              this.options.locations &&
                (++this.curLine, (this.lineStart = this.pos));
            break;
          case 47:
            switch (this.input.charCodeAt(this.pos + 1)) {
              case 42:
                this.skipBlockComment();
                break;
              case 47:
                this.skipLineComment(2);
                break;
              default:
                break e;
            }
            break;
          default:
            if (
              !(
                (e > 8 && e < 14) ||
                (e >= 5760 && nr.test(String.fromCharCode(e)))
              )
            )
              break e;
            ++this.pos;
        }
      }
    }),
    (ua.finishToken = function(e, t) {
      (this.end = this.pos),
        this.options.locations && (this.endLoc = this.curPosition());
      var s = this.type;
      (this.type = e), (this.value = t), this.updateContext(s);
    }),
    (ua.readToken_dot = function() {
      var e = this.input.charCodeAt(this.pos + 1);
      if (e >= 48 && e <= 57) return this.readNumber(!0);
      var t = this.input.charCodeAt(this.pos + 2);
      return this.options.ecmaVersion >= 6 && 46 === e && 46 === t
        ? ((this.pos += 3), this.finishToken(Zi.ellipsis))
        : (++this.pos, this.finishToken(Zi.dot));
    }),
    (ua.readToken_slash = function() {
      var e = this.input.charCodeAt(this.pos + 1);
      return this.exprAllowed
        ? (++this.pos, this.readRegexp())
        : 61 === e
        ? this.finishOp(Zi.assign, 2)
        : this.finishOp(Zi.slash, 1);
    }),
    (ua.readToken_mult_modulo_exp = function(e) {
      var t = this.input.charCodeAt(this.pos + 1),
        s = 1,
        n = 42 === e ? Zi.star : Zi.modulo;
      return (
        this.options.ecmaVersion >= 7 &&
          42 === e &&
          42 === t &&
          (++s, (n = Zi.starstar), (t = this.input.charCodeAt(this.pos + 2))),
        61 === t ? this.finishOp(Zi.assign, s + 1) : this.finishOp(n, s)
      );
    }),
    (ua.readToken_pipe_amp = function(e) {
      var t = this.input.charCodeAt(this.pos + 1);
      return t === e
        ? this.finishOp(124 === e ? Zi.logicalOR : Zi.logicalAND, 2)
        : 61 === t
        ? this.finishOp(Zi.assign, 2)
        : this.finishOp(124 === e ? Zi.bitwiseOR : Zi.bitwiseAND, 1);
    }),
    (ua.readToken_caret = function() {
      return 61 === this.input.charCodeAt(this.pos + 1)
        ? this.finishOp(Zi.assign, 2)
        : this.finishOp(Zi.bitwiseXOR, 1);
    }),
    (ua.readToken_plus_min = function(e) {
      var t = this.input.charCodeAt(this.pos + 1);
      return t === e
        ? 45 !== t ||
          this.inModule ||
          62 !== this.input.charCodeAt(this.pos + 2) ||
          (0 !== this.lastTokEnd &&
            !er.test(this.input.slice(this.lastTokEnd, this.pos)))
          ? this.finishOp(Zi.incDec, 2)
          : (this.skipLineComment(3), this.skipSpace(), this.nextToken())
        : 61 === t
        ? this.finishOp(Zi.assign, 2)
        : this.finishOp(Zi.plusMin, 1);
    }),
    (ua.readToken_lt_gt = function(e) {
      var t = this.input.charCodeAt(this.pos + 1),
        s = 1;
      return t === e
        ? ((s = 62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2),
          61 === this.input.charCodeAt(this.pos + s)
            ? this.finishOp(Zi.assign, s + 1)
            : this.finishOp(Zi.bitShift, s))
        : 33 !== t ||
          60 !== e ||
          this.inModule ||
          45 !== this.input.charCodeAt(this.pos + 2) ||
          45 !== this.input.charCodeAt(this.pos + 3)
        ? (61 === t && (s = 2), this.finishOp(Zi.relational, s))
        : (this.skipLineComment(4), this.skipSpace(), this.nextToken());
    }),
    (ua.readToken_eq_excl = function(e) {
      var t = this.input.charCodeAt(this.pos + 1);
      return 61 === t
        ? this.finishOp(
            Zi.equality,
            61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2
          )
        : 61 === e && 62 === t && this.options.ecmaVersion >= 6
        ? ((this.pos += 2), this.finishToken(Zi.arrow))
        : this.finishOp(61 === e ? Zi.eq : Zi.prefix, 1);
    }),
    (ua.getTokenFromCode = function(e) {
      switch (e) {
        case 46:
          return this.readToken_dot();
        case 40:
          return ++this.pos, this.finishToken(Zi.parenL);
        case 41:
          return ++this.pos, this.finishToken(Zi.parenR);
        case 59:
          return ++this.pos, this.finishToken(Zi.semi);
        case 44:
          return ++this.pos, this.finishToken(Zi.comma);
        case 91:
          return ++this.pos, this.finishToken(Zi.bracketL);
        case 93:
          return ++this.pos, this.finishToken(Zi.bracketR);
        case 123:
          return ++this.pos, this.finishToken(Zi.braceL);
        case 125:
          return ++this.pos, this.finishToken(Zi.braceR);
        case 58:
          return ++this.pos, this.finishToken(Zi.colon);
        case 63:
          return ++this.pos, this.finishToken(Zi.question);
        case 96:
          if (this.options.ecmaVersion < 6) break;
          return ++this.pos, this.finishToken(Zi.backQuote);
        case 48:
          var t = this.input.charCodeAt(this.pos + 1);
          if (120 === t || 88 === t) return this.readRadixNumber(16);
          if (this.options.ecmaVersion >= 6) {
            if (111 === t || 79 === t) return this.readRadixNumber(8);
            if (98 === t || 66 === t) return this.readRadixNumber(2);
          }
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          return this.readNumber(!1);
        case 34:
        case 39:
          return this.readString(e);
        case 47:
          return this.readToken_slash();
        case 37:
        case 42:
          return this.readToken_mult_modulo_exp(e);
        case 124:
        case 38:
          return this.readToken_pipe_amp(e);
        case 94:
          return this.readToken_caret();
        case 43:
        case 45:
          return this.readToken_plus_min(e);
        case 60:
        case 62:
          return this.readToken_lt_gt(e);
        case 61:
        case 33:
          return this.readToken_eq_excl(e);
        case 126:
          return this.finishOp(Zi.prefix, 1);
      }
      this.raise(this.pos, "Unexpected character '" + da(e) + "'");
    }),
    (ua.finishOp = function(e, t) {
      var s = this.input.slice(this.pos, this.pos + t);
      return (this.pos += t), this.finishToken(e, s);
    }),
    (ua.readRegexp = function() {
      for (var e, t, s = this.pos; ; ) {
        this.pos >= this.input.length &&
          this.raise(s, "Unterminated regular expression");
        var n = this.input.charAt(this.pos);
        if ((er.test(n) && this.raise(s, "Unterminated regular expression"), e))
          e = !1;
        else {
          if ("[" === n) t = !0;
          else if ("]" === n && t) t = !1;
          else if ("/" === n && !t) break;
          e = "\\" === n;
        }
        ++this.pos;
      }
      var i = this.input.slice(s, this.pos);
      ++this.pos;
      var r = this.pos,
        a = this.readWord1();
      this.containsEsc && this.unexpected(r);
      var o = this.regexpState || (this.regexpState = new ea(this));
      o.reset(s, i, a),
        this.validateRegExpFlags(o),
        this.validateRegExpPattern(o);
      var h = null;
      try {
        h = new RegExp(i, a);
      } catch (e) {}
      return this.finishToken(Zi.regexp, { pattern: i, flags: a, value: h });
    }),
    (ua.readInt = function(e, t) {
      for (
        var s = this.pos, n = 0, i = 0, r = null == t ? 1 / 0 : t;
        i < r;
        ++i
      ) {
        var a = this.input.charCodeAt(this.pos),
          o = void 0;
        if (
          (o =
            a >= 97
              ? a - 97 + 10
              : a >= 65
              ? a - 65 + 10
              : a >= 48 && a <= 57
              ? a - 48
              : 1 / 0) >= e
        )
          break;
        ++this.pos, (n = n * e + o);
      }
      return this.pos === s || (null != t && this.pos - s !== t) ? null : n;
    }),
    (ua.readRadixNumber = function(e) {
      var t = this.pos;
      this.pos += 2;
      var s = this.readInt(e);
      return (
        null == s &&
          this.raise(this.start + 2, "Expected number in radix " + e),
        this.options.ecmaVersion >= 11 &&
        110 === this.input.charCodeAt(this.pos)
          ? ((s =
              "undefined" != typeof BigInt
                ? BigInt(this.input.slice(t, this.pos))
                : null),
            ++this.pos)
          : Gi(this.fullCharCodeAtPos()) &&
            this.raise(this.pos, "Identifier directly after number"),
        this.finishToken(Zi.num, s)
      );
    }),
    (ua.readNumber = function(e) {
      var t = this.pos;
      e || null !== this.readInt(10) || this.raise(t, "Invalid number");
      var s = this.pos - t >= 2 && 48 === this.input.charCodeAt(t);
      s && this.strict && this.raise(t, "Invalid number"),
        s && /[89]/.test(this.input.slice(t, this.pos)) && (s = !1);
      var n = this.input.charCodeAt(this.pos);
      if (!s && !e && this.options.ecmaVersion >= 11 && 110 === n) {
        var i = this.input.slice(t, this.pos),
          r = "undefined" != typeof BigInt ? BigInt(i) : null;
        return (
          ++this.pos,
          Gi(this.fullCharCodeAtPos()) &&
            this.raise(this.pos, "Identifier directly after number"),
          this.finishToken(Zi.num, r)
        );
      }
      46 !== n ||
        s ||
        (++this.pos, this.readInt(10), (n = this.input.charCodeAt(this.pos))),
        (69 !== n && 101 !== n) ||
          s ||
          ((43 !== (n = this.input.charCodeAt(++this.pos)) && 45 !== n) ||
            ++this.pos,
          null === this.readInt(10) && this.raise(t, "Invalid number")),
        Gi(this.fullCharCodeAtPos()) &&
          this.raise(this.pos, "Identifier directly after number");
      var a = this.input.slice(t, this.pos),
        o = s ? parseInt(a, 8) : parseFloat(a);
      return this.finishToken(Zi.num, o);
    }),
    (ua.readCodePoint = function() {
      var e;
      if (123 === this.input.charCodeAt(this.pos)) {
        this.options.ecmaVersion < 6 && this.unexpected();
        var t = ++this.pos;
        (e = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos)),
          ++this.pos,
          e > 1114111 && this.invalidStringToken(t, "Code point out of bounds");
      } else e = this.readHexChar(4);
      return e;
    }),
    (ua.readString = function(e) {
      for (var t = "", s = ++this.pos; ; ) {
        this.pos >= this.input.length &&
          this.raise(this.start, "Unterminated string constant");
        var n = this.input.charCodeAt(this.pos);
        if (n === e) break;
        92 === n
          ? ((t += this.input.slice(s, this.pos)),
            (t += this.readEscapedChar(!1)),
            (s = this.pos))
          : (sr(n, this.options.ecmaVersion >= 10) &&
              this.raise(this.start, "Unterminated string constant"),
            ++this.pos);
      }
      return (
        (t += this.input.slice(s, this.pos++)), this.finishToken(Zi.string, t)
      );
    });
  var pa = {};
  (ua.tryReadTemplateToken = function() {
    this.inTemplateElement = !0;
    try {
      this.readTmplToken();
    } catch (e) {
      if (e !== pa) throw e;
      this.readInvalidTemplateToken();
    }
    this.inTemplateElement = !1;
  }),
    (ua.invalidStringToken = function(e, t) {
      if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw pa;
      this.raise(e, t);
    }),
    (ua.readTmplToken = function() {
      for (var e = "", t = this.pos; ; ) {
        this.pos >= this.input.length &&
          this.raise(this.start, "Unterminated template");
        var s = this.input.charCodeAt(this.pos);
        if (
          96 === s ||
          (36 === s && 123 === this.input.charCodeAt(this.pos + 1))
        )
          return this.pos !== this.start ||
            (this.type !== Zi.template && this.type !== Zi.invalidTemplate)
            ? ((e += this.input.slice(t, this.pos)),
              this.finishToken(Zi.template, e))
            : 36 === s
            ? ((this.pos += 2), this.finishToken(Zi.dollarBraceL))
            : (++this.pos, this.finishToken(Zi.backQuote));
        if (92 === s)
          (e += this.input.slice(t, this.pos)),
            (e += this.readEscapedChar(!0)),
            (t = this.pos);
        else if (sr(s)) {
          switch (((e += this.input.slice(t, this.pos)), ++this.pos, s)) {
            case 13:
              10 === this.input.charCodeAt(this.pos) && ++this.pos;
            case 10:
              e += "\n";
              break;
            default:
              e += String.fromCharCode(s);
          }
          this.options.locations &&
            (++this.curLine, (this.lineStart = this.pos)),
            (t = this.pos);
        } else ++this.pos;
      }
    }),
    (ua.readInvalidTemplateToken = function() {
      for (; this.pos < this.input.length; this.pos++)
        switch (this.input[this.pos]) {
          case "\\":
            ++this.pos;
            break;
          case "$":
            if ("{" !== this.input[this.pos + 1]) break;
          case "`":
            return this.finishToken(
              Zi.invalidTemplate,
              this.input.slice(this.start, this.pos)
            );
        }
      this.raise(this.start, "Unterminated template");
    }),
    (ua.readEscapedChar = function(e) {
      var t = this.input.charCodeAt(++this.pos);
      switch ((++this.pos, t)) {
        case 110:
          return "\n";
        case 114:
          return "\r";
        case 120:
          return String.fromCharCode(this.readHexChar(2));
        case 117:
          return da(this.readCodePoint());
        case 116:
          return "\t";
        case 98:
          return "\b";
        case 118:
          return "\v";
        case 102:
          return "\f";
        case 13:
          10 === this.input.charCodeAt(this.pos) && ++this.pos;
        case 10:
          return (
            this.options.locations &&
              ((this.lineStart = this.pos), ++this.curLine),
            ""
          );
        default:
          if (t >= 48 && t <= 55) {
            var s = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
              n = parseInt(s, 8);
            return (
              n > 255 && ((s = s.slice(0, -1)), (n = parseInt(s, 8))),
              (this.pos += s.length - 1),
              (t = this.input.charCodeAt(this.pos)),
              ("0" === s && 56 !== t && 57 !== t) ||
                (!this.strict && !e) ||
                this.invalidStringToken(
                  this.pos - 1 - s.length,
                  e
                    ? "Octal literal in template string"
                    : "Octal literal in strict mode"
                ),
              String.fromCharCode(n)
            );
          }
          return sr(t) ? "" : String.fromCharCode(t);
      }
    }),
    (ua.readHexChar = function(e) {
      var t = this.pos,
        s = this.readInt(16, e);
      return (
        null === s &&
          this.invalidStringToken(t, "Bad character escape sequence"),
        s
      );
    }),
    (ua.readWord1 = function() {
      this.containsEsc = !1;
      for (
        var e = "", t = !0, s = this.pos, n = this.options.ecmaVersion >= 6;
        this.pos < this.input.length;

      ) {
        var i = this.fullCharCodeAtPos();
        if (Hi(i, n)) this.pos += i <= 65535 ? 1 : 2;
        else {
          if (92 !== i) break;
          (this.containsEsc = !0), (e += this.input.slice(s, this.pos));
          var r = this.pos;
          117 !== this.input.charCodeAt(++this.pos) &&
            this.invalidStringToken(
              this.pos,
              "Expecting Unicode escape sequence \\uXXXX"
            ),
            ++this.pos;
          var a = this.readCodePoint();
          (t ? Gi : Hi)(a, n) ||
            this.invalidStringToken(r, "Invalid Unicode escape"),
            (e += da(a)),
            (s = this.pos);
        }
        t = !1;
      }
      return e + this.input.slice(s, this.pos);
    }),
    (ua.readWord = function() {
      var e = this.readWord1(),
        t = Zi.name;
      return (
        this.keywords.test(e) &&
          (this.containsEsc &&
            this.raiseRecoverable(
              this.start,
              "Escape sequence in keyword " + e
            ),
          (t = Qi[e])),
        this.finishToken(t, e)
      );
    });
  vr.acorn = {
    Parser: vr,
    version: "7.1.0",
    defaultOptions: fr,
    Position: ur,
    SourceLocation: dr,
    getLineInfo: pr,
    Node: Vr,
    TokenType: qi,
    tokTypes: Zi,
    keywordTypes: Qi,
    TokContext: Wr,
    tokContexts: jr,
    isIdentifierChar: Hi,
    isIdentifierStart: Gi,
    Token: ca,
    isNewLine: sr,
    lineBreak: er,
    lineBreakG: tr,
    nonASCIIwhitespace: nr,
  };
  var fa = (function(e) {
    return (e && e.default) || e;
  })(
    Object.freeze({
      __proto__: null,
      Node: Vr,
      Parser: vr,
      Position: ur,
      SourceLocation: dr,
      TokContext: Wr,
      Token: ca,
      TokenType: qi,
      defaultOptions: fr,
      getLineInfo: pr,
      isIdentifierChar: Hi,
      isIdentifierStart: Gi,
      isNewLine: sr,
      keywordTypes: Qi,
      lineBreak: er,
      lineBreakG: tr,
      nonASCIIwhitespace: nr,
      parse: function(e, t) {
        return vr.parse(e, t);
      },
      parseExpressionAt: function(e, t, s) {
        return vr.parseExpressionAt(e, t, s);
      },
      tokContexts: jr,
      tokTypes: Zi,
      tokenizer: function(e, t) {
        return vr.tokenizer(e, t);
      },
      version: "7.1.0",
    })
  );
  const ma = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
    ga = fa.tokTypes;
  var xa = function(e) {
    return class extends e {
      parseExport(e, t) {
        ma.lastIndex = this.pos;
        const s = ma.exec(this.input);
        if ("*" !== this.input.charAt(this.pos + s[0].length))
          return super.parseExport(e, t);
        this.next();
        const n = this.startNode();
        return (
          this.expect(ga.star),
          this.eatContextual("as") &&
            ((e.declaration = null),
            (n.exported = this.parseIdent(!0)),
            this.checkExport(t, n.exported.name, this.lastTokStart),
            (e.specifiers = [this.finishNode(n, "ExportNamespaceSpecifier")])),
          this.expectContextual("from"),
          this.type !== ga.string && this.unexpected(),
          (e.source = this.parseExprAtom()),
          this.semicolon(),
          this.finishNode(
            e,
            e.specifiers ? "ExportNamedDeclaration" : "ExportAllDeclaration"
          )
        );
      }
    };
  };
  const ya = fa.tokTypes,
    Ea = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
    ba = (e) => {
      Ea.lastIndex = e.pos;
      let t = Ea.exec(e.input),
        s = e.pos + t[0].length;
      return "." === e.input.slice(s, s + 1);
    };
  var va = function(e) {
    return class extends e {
      parseExprAtom(e) {
        if (this.type !== ya._import || !ba(this))
          return super.parseExprAtom(e);
        this.options.allowImportExportEverywhere ||
          this.inModule ||
          this.raise(
            this.start,
            "'import' and 'export' may appear only with 'sourceType: module'"
          );
        let t = this.startNode();
        return (
          (t.meta = this.parseIdent(!0)),
          this.expect(ya.dot),
          (t.property = this.parseIdent(!0)),
          "meta" !== t.property.name &&
            this.raiseRecoverable(
              t.property.start,
              "The only valid meta property for import is import.meta"
            ),
          this.containsEsc &&
            this.raiseRecoverable(
              t.property.start,
              '"meta" in import.meta must not contain escape sequences'
            ),
          this.finishNode(t, "MetaProperty")
        );
      }
      parseStatement(e, t, s) {
        if (this.type !== ya._import || !ba(this))
          return super.parseStatement(e, t, s);
        let n = this.startNode(),
          i = this.parseExpression();
        return this.parseExpressionStatement(n, i);
      }
    };
  };
  class Sa extends at {
    constructor() {
      super("undefined");
    }
    getLiteralValueAtPath() {}
  }
  class Aa extends It {
    constructor() {
      super(), this.variables.set("undefined", new Sa());
    }
    findVariable(e) {
      let t = this.variables.get(e);
      return t || ((t = new Zt(e)), this.variables.set(e, t)), t;
    }
  }
  const Ca = "at position ",
    ka = "at output position ";
  function Pa(e, t, { hook: s, id: n } = {}) {
    return (
      "string" == typeof e && (e = { message: e }),
      e.code && e.code !== Ns.PLUGIN_ERROR && (e.pluginCode = e.code),
      (e.code = Ns.PLUGIN_ERROR),
      (e.plugin = t),
      s && (e.hook = s),
      n && (e.id = n),
      ws(e)
    );
  }
  const wa = [
    { active: !0, deprecated: "ongenerate", replacement: "generateBundle" },
    {
      active: !0,
      deprecated: "onwrite",
      replacement: "generateBundle/writeBundle",
    },
    { active: !0, deprecated: "transformBundle", replacement: "renderChunk" },
    { active: !0, deprecated: "transformChunk", replacement: "renderChunk" },
    {
      active: !1,
      deprecated: "resolveAssetUrl",
      replacement: "resolveFileUrl",
    },
  ];
  const Ia = { has: () => !1, get() {}, set() {}, delete: () => !1 };
  function Na(e) {
    return e.startsWith(Ca) || e.startsWith(ka)
      ? ws({
          code: "ANONYMOUS_PLUGIN_CACHE",
          message:
            "A plugin is trying to use the Rollup cache but is not declaring a plugin name or cacheKey.",
        })
      : ws({
          code: "DUPLICATE_PLUGIN_NAME",
          message: `The plugin name ${e} is being used twice in the same build. Plugin names must be distinct or provide a cacheKey (please post an issue to the plugin if you are a plugin user).`,
        });
  }
  function $a(e, t, s) {
    const n = s.id,
      i = [];
    let r = null === t.map ? null : wi(t.map);
    const a = t.code;
    let o = t.ast;
    const l = [],
      c = [];
    let u,
      d,
      p = !1,
      f = null;
    const m = t.code;
    let g;
    return e.pluginDriver
      .hookReduceArg0(
        "transform",
        [m, n],
        function(t, r, a) {
          if ((!p && u.used && (p = !0), p)) {
            if (r && "object" == typeof r && Array.isArray(r.dependencies))
              for (const t of r.dependencies) e.watchFiles[At(bt(n), t)] = !0;
          } else if (
            (c.length && (s.transformFiles = c),
            r && "object" == typeof r && Array.isArray(r.dependencies))
          ) {
            d.warnedTransformDependencies ||
              e.warnDeprecation(
                `Returning "dependencies" from the "transform" hook as done by plugin ${a.name} is deprecated. The "this.addWatchFile" plugin context function should be used instead.`,
                !0
              ),
              (d.warnedTransformDependencies = !0);
            for (const e of r.dependencies) l.push(At(bt(n), e));
          }
          if ("string" == typeof r) r = { ast: void 0, code: r, map: void 0 };
          else {
            if (!r || "object" != typeof r) return t;
            "string" == typeof r.map && (r.map = JSON.parse(r.map)),
              "boolean" == typeof r.moduleSideEffects &&
                (f = r.moduleSideEffects);
          }
          if (null !== r.map) {
            const e = wi(r.map);
            i.push(e || { missing: !0, plugin: a.name });
          }
          return (o = r.ast), r.code;
        },
        (t, s) => (
          (d = s).cacheKey
            ? (p = !0)
            : (u = (function(e) {
                const t = {
                  cache: {
                    has: (s) => ((t.used = !0), e.has(s)),
                    get: (s) => ((t.used = !0), e.get(s)),
                    set: (s, n) => ((t.used = !0), e.set(s, n)),
                    delete: (s) => ((t.used = !0), e.delete(s)),
                  },
                  used: !1,
                };
                return t;
              })(t.cache)),
          Object.assign(Object.assign({}, t), {
            cache: u ? u.cache : t.cache,
            warn(e, s) {
              "string" == typeof e && (e = { message: e }),
                s && Is(e, s, m, n),
                (e.id = n),
                (e.hook = "transform"),
                t.warn(e);
            },
            error: (e, s) => (
              "string" == typeof e && (e = { message: e }),
              s && Is(e, s, m, n),
              (e.id = n),
              (e.hook = "transform"),
              t.error(e)
            ),
            emitAsset(t, s) {
              const n = { type: "asset", name: t, source: s };
              return c.push(Object.assign({}, n)), e.pluginDriver.emitFile(n);
            },
            emitChunk(t, s) {
              const n = { type: "chunk", id: t, name: s && s.name };
              return c.push(Object.assign({}, n)), e.pluginDriver.emitFile(n);
            },
            emitFile: (t) => (c.push(t), e.pluginDriver.emitFile(t)),
            addWatchFile(e) {
              l.push(e), t.addWatchFile(e);
            },
            setAssetSource(e, s) {
              if ((t.setAssetSource(e, s), !p && !g))
                try {
                  this.error({
                    code: "INVALID_SETASSETSOURCE",
                    message:
                      "setAssetSource cannot be called in transform for caching reasons. Use emitFile with a source, or call setAssetSource in another hook.",
                  });
                } catch (e) {
                  g = e;
                }
            },
            getCombinedSourcemap() {
              const t = (function(e, t, s, n, i) {
                if (!i.length) return n;
                const r = yi(t, s, n, i, xi(e)).traceMappings();
                return Object.assign({ version: 3 }, r);
              })(e, n, a, r, i);
              if (!t) {
                return new x(a).generateMap({
                  includeContent: !0,
                  hires: !0,
                  source: n,
                });
              }
              return (
                r !== t && ((r = t), (i.length = 0)),
                new h(
                  Object.assign(Object.assign({}, t), {
                    file: null,
                    sourcesContent: t.sourcesContent,
                  })
                )
              );
            },
          })
        )
      )
      .catch((e) => Pa(e, d.name, { hook: "transform", id: n }))
      .then((e) => {
        if (!p && g) throw g;
        return {
          ast: o,
          code: e,
          customTransformCache: p,
          moduleSideEffects: f,
          originalCode: a,
          originalSourcemap: r,
          sourcemapChain: i,
          transformDependencies: l,
        };
      });
  }
  function _a(e, t) {
    return xt(t) ? At(e, "..", t) : t;
  }
  function La(e) {
    if (!0 === e) return () => !0;
    if ("function" == typeof e)
      return (t, ...s) => (!t.startsWith("\0") && e(t, ...s)) || !1;
    if (e) {
      const t = new Set(Array.isArray(e) ? e : e ? [e] : []);
      return (e) => t.has(e);
    }
    return () => !1;
  }
  function Ta(e, t, s) {
    if ("boolean" == typeof e) return () => e;
    if ("no-external" === e) return (e, t) => !t;
    if ("function" == typeof e)
      return (t, s) => !!t.startsWith("\0") || !1 !== e(t, s);
    if (Array.isArray(e)) {
      const t = new Set(e);
      return (e) => t.has(e);
    }
    var n, i;
    e &&
      s.warn(
        ((n = "treeshake.moduleSideEffects"),
        (i = 'please use one of false, "no-external", a function or an array'),
        {
          code: Ns.INVALID_OPTION,
          message: `Invalid value for option "${n}" - ${i}.`,
        })
      );
    const r = La(t);
    return (e, t) => !(t && r(e));
  }
  class Ra {
    constructor(e, t, s, n, i, r, a) {
      (this.indexedEntryModules = []),
        (this.latestLoadModulesPromise = Promise.resolve()),
        (this.manualChunkModules = {}),
        (this.nextEntryModuleIndex = 0),
        (this.loadEntryModule = (e, t) =>
          this.pluginDriver.hookFirst("resolveId", [e, void 0]).then((s) => {
            if (!1 === s || (s && "object" == typeof s && s.external))
              return ws(
                (function(e) {
                  return {
                    code: Ns.UNRESOLVED_ENTRY,
                    message: `Entry module cannot be external (${ks(e)}).`,
                  };
                })(e)
              );
            const n = s && "object" == typeof s ? s.id : s;
            return "string" == typeof n
              ? this.fetchModule(n, void 0, !0, t)
              : ws(
                  (function(e) {
                    return {
                      code: Ns.UNRESOLVED_ENTRY,
                      message: `Could not resolve entry module (${ks(e)}).`,
                    };
                  })(e)
                );
          })),
        (this.graph = e),
        (this.modulesById = t),
        (this.pluginDriver = s),
        (this.isExternal = La(n)),
        (this.hasModuleSideEffects = Ta(r, a, e)),
        (this.getManualChunk = "function" == typeof i ? i : () => null);
    }
    addEntryModules(e, t) {
      const s = this.nextEntryModuleIndex;
      this.nextEntryModuleIndex += e.length;
      const n = Promise.all(
        e.map(({ fileName: e, id: s, name: n }) =>
          this.loadEntryModule(s, !0).then(
            (s) => (
              null !== e
                ? s.chunkFileNames.add(e)
                : null !== n &&
                  (null === s.chunkName && (s.chunkName = n),
                  t && s.userChunkNames.add(n)),
              s
            )
          )
        )
      ).then((e) => {
        let n = s;
        for (const s of e) {
          s.isUserDefinedEntryPoint = s.isUserDefinedEntryPoint || t;
          const e = this.indexedEntryModules.find((e) => e.module.id === s.id);
          e
            ? (e.index = Math.min(e.index, n))
            : this.indexedEntryModules.push({ module: s, index: n }),
            n++;
        }
        return (
          this.indexedEntryModules.sort(({ index: e }, { index: t }) =>
            e > t ? 1 : -1
          ),
          e
        );
      });
      return this.awaitLoadModulesPromise(n).then((e) => ({
        entryModules: this.indexedEntryModules.map(({ module: e }) => e),
        manualChunkModulesByAlias: this.manualChunkModules,
        newEntryModules: e,
      }));
    }
    addManualChunks(e) {
      const t = [];
      for (const s of Object.keys(e)) {
        const n = e[s];
        for (const e of n) t.push({ id: e, alias: s });
      }
      const s = Promise.all(
        t.map(({ id: e }) => this.loadEntryModule(e, !1))
      ).then((e) => {
        for (let s = 0; s < e.length; s++)
          this.addModuleToManualChunk(t[s].alias, e[s]);
      });
      return this.awaitLoadModulesPromise(s);
    }
    resolveId(t, s, n) {
      return e(this, void 0, void 0, function*() {
        return this.normalizeResolveIdResult(
          !this.isExternal(t, s, !1) &&
            (yield this.pluginDriver.hookFirst("resolveId", [t, s], null, n)),
          s,
          t
        );
      });
    }
    addModuleToManualChunk(e, t) {
      var s, n, i;
      null !== t.manualChunkAlias &&
        t.manualChunkAlias !== e &&
        ws(
          ((s = t.id),
          (n = e),
          (i = t.manualChunkAlias),
          {
            code: Ns.INVALID_CHUNK,
            message: `Cannot assign ${ks(
              s
            )} to the "${n}" chunk as it is already in the "${i}" chunk.`,
          })
        ),
        (t.manualChunkAlias = e),
        this.manualChunkModules[e] || (this.manualChunkModules[e] = []),
        this.manualChunkModules[e].push(t);
    }
    awaitLoadModulesPromise(e) {
      this.latestLoadModulesPromise = Promise.all([
        e,
        this.latestLoadModulesPromise,
      ]);
      const t = () => {
        const e = this.latestLoadModulesPromise;
        return e.then(() => {
          if (this.latestLoadModulesPromise !== e) return t();
        });
      };
      return t().then(() => e);
    }
    fetchAllDependencies(t) {
      return Promise.all([
        ...Array.from(t.sources).map((s) =>
          e(this, void 0, void 0, function*() {
            return this.fetchResolvedDependency(
              s,
              t.id,
              (t.resolvedIds[s] =
                t.resolvedIds[s] ||
                this.handleMissingImports(
                  yield this.resolveId(s, t.id),
                  s,
                  t.id
                ))
            );
          })
        ),
        ...t.getDynamicImportExpressions().map((e, s) =>
          this.resolveDynamicImport(t, e, t.id).then((e) => {
            if (null === e) return;
            const n = t.dynamicImports[s];
            if ("string" != typeof e)
              return this.fetchResolvedDependency(ks(e.id), t.id, e).then(
                (e) => {
                  n.resolution = e;
                }
              );
            n.resolution = e;
          })
        ),
      ]);
    }
    fetchModule(e, t, s, n) {
      const i = this.modulesById.get(e);
      if (i instanceof fi)
        return (i.isEntryPoint = i.isEntryPoint || n), Promise.resolve(i);
      const r = new fi(this.graph, e, s, n);
      this.modulesById.set(e, r), (this.graph.watchFiles[e] = !0);
      const a = this.getManualChunk(e);
      return (
        "string" == typeof a && this.addModuleToManualChunk(a, r),
        ai("load modules", 3),
        Promise.resolve(this.pluginDriver.hookFirst("load", [e]))
          .catch((s) => {
            oi("load modules", 3);
            let n = `Could not load ${e}`;
            throw (t && (n += ` (imported by ${t})`),
            (n += `: ${s.message}`),
            (s.message = n),
            s);
          })
          .then(
            (t) => (
              oi("load modules", 3),
              "string" == typeof t
                ? { code: t }
                : t && "object" == typeof t && "string" == typeof t.code
                ? t
                : ws(
                    (function(e) {
                      return {
                        code: Ns.BAD_LOADER,
                        message: `Error loading ${ks(
                          e
                        )}: plugin load hook should return a string, a { code, map } object, or nothing/null`,
                      };
                    })(e)
                  )
            )
          )
          .then((t) => {
            const s = this.graph.cachedModules.get(e);
            if (s && !s.customTransformCache && s.originalCode === t.code) {
              if (s.transformFiles)
                for (const e of s.transformFiles) this.pluginDriver.emitFile(e);
              return s;
            }
            return (
              "boolean" == typeof t.moduleSideEffects &&
                (r.moduleSideEffects = t.moduleSideEffects),
              $a(this.graph, t, r)
            );
          })
          .then(
            (t) => (
              r.setSource(t),
              this.modulesById.set(e, r),
              this.fetchAllDependencies(r).then(() => {
                for (const e in r.exports)
                  "default" !== e && (r.exportsAll[e] = r.id);
                for (const e of r.exportAllSources) {
                  const t = r.resolvedIds[e].id,
                    s = this.modulesById.get(t);
                  if (!(s instanceof Ct))
                    for (const e in s.exportsAll)
                      e in r.exportsAll
                        ? this.graph.warn(Ls(e, r, s))
                        : (r.exportsAll[e] = s.exportsAll[e]);
                }
                return r;
              })
            )
          )
      );
    }
    fetchResolvedDependency(e, t, s) {
      if (s.external) {
        this.modulesById.has(s.id) ||
          this.modulesById.set(
            s.id,
            new Ct(this.graph, s.id, s.moduleSideEffects)
          );
        const n = this.modulesById.get(s.id);
        return n instanceof Ct
          ? Promise.resolve(n)
          : ws(
              (function(e, t) {
                return {
                  code: Ns.INVALID_EXTERNAL_ID,
                  message: `'${e}' is imported as an external by ${ks(
                    t
                  )}, but is already an existing non-external module id.`,
                };
              })(e, t)
            );
      }
      return this.fetchModule(s.id, t, s.moduleSideEffects, !1);
    }
    handleMissingImports(e, t, s) {
      return null === e
        ? (xt(t) &&
            ws(
              (function(e, t) {
                return {
                  code: Ns.UNRESOLVED_IMPORT,
                  message: `Could not resolve '${e}' from ${ks(t)}`,
                };
              })(t, s)
            ),
          this.graph.warn(
            (function(e, t) {
              return {
                code: Ns.UNRESOLVED_IMPORT,
                importer: ks(t),
                message: `'${e}' is imported by ${ks(
                  t
                )}, but could not be resolved – treating it as an external dependency`,
                source: e,
                url:
                  "https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency",
              };
            })(t, s)
          ),
          {
            external: !0,
            id: t,
            moduleSideEffects: this.hasModuleSideEffects(t, !0),
          })
        : e;
    }
    normalizeResolveIdResult(e, t, s) {
      let n = "",
        i = !1,
        r = null;
      if (e)
        "object" == typeof e
          ? ((n = e.id),
            e.external && (i = !0),
            "boolean" == typeof e.moduleSideEffects &&
              (r = e.moduleSideEffects))
          : (this.isExternal(e, t, !0) && (i = !0), (n = i ? _a(t, e) : e));
      else {
        if (((n = _a(t, s)), !1 !== e && !this.isExternal(n, t, !0)))
          return null;
        i = !0;
      }
      return {
        external: i,
        id: n,
        moduleSideEffects:
          "boolean" == typeof r ? r : this.hasModuleSideEffects(n, i),
      };
    }
    resolveDynamicImport(t, s, n) {
      return e(this, void 0, void 0, function*() {
        const e = yield this.pluginDriver.hookFirst("resolveDynamicImport", [
          s,
          n,
        ]);
        return "string" != typeof s
          ? "string" == typeof e
            ? e
            : e
            ? Object.assign({ external: !1, moduleSideEffects: !0 }, e)
            : null
          : null == e
          ? (t.resolvedIds[s] =
              t.resolvedIds[s] ||
              this.handleMissingImports(yield this.resolveId(s, t.id), s, t.id))
          : this.handleMissingImports(
              this.normalizeResolveIdResult(e, n, s),
              s,
              n
            );
      });
    }
  }
  var Ma;
  !(function(e) {
    (e[(e.LOAD_AND_PARSE = 0)] = "LOAD_AND_PARSE"),
      (e[(e.ANALYSE = 1)] = "ANALYSE"),
      (e[(e.GENERATE = 2)] = "GENERATE");
  })(Ma || (Ma = {}));
  const Oa = 97,
    Da = 48;
  function Va(e) {
    return e < 10
      ? String.fromCharCode(Da + e)
      : String.fromCharCode(Oa + (e - 10));
  }
  function Ba(e) {
    let t = "";
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      (t += Va(n >> 4)), (t += Va(15 & n));
    }
    return t;
  }
  function Fa(e) {
    const t = new Uint8Array(e);
    for (let e = 0; e < t.length; e++) t[e] = 512 * Math.random();
    return t;
  }
  const Wa = () => q();
  function ja(e, t, s) {
    e in t &&
      s.warn(
        (function(e) {
          return {
            code: Ns.FILE_NAME_CONFLICT,
            message: `The emitted file "${e}" overwrites a previously emitted file of the same name.`,
          };
        })(e)
      ),
      (t[e] = Ua);
  }
  const Ua = { type: "placeholder" };
  function za(e, t, s) {
    if ("string" != typeof e && !Buffer.isBuffer(e)) {
      const e = t.fileName || t.name || s;
      return ws(
        Ts(
          `Could not set source for ${
            "string" == typeof e ? `asset "${e}"` : "unnamed asset"
          }, asset source needs to be a string of Buffer.`
        )
      );
    }
    return e;
  }
  function Ga(e, t) {
    return "string" != typeof e.fileName
      ? ws(
          ((s = e.name || t),
          {
            code: Ns.ASSET_NOT_FINALISED,
            message: `Plugin error - Unable to get file name for asset "${s}". Ensure that the source is set and that generate is called first.`,
          })
        )
      : e.fileName;
    var s;
  }
  function Ha(e) {
    const t = e.fileName || (e.module && e.module.facadeChunk.id);
    return (
      t ||
      ws(
        ((s = e.fileName || e.name),
        {
          code: Ns.CHUNK_NOT_GENERATED,
          message: `Plugin error - Unable to get file name for chunk "${s}". Ensure that generate is called first.`,
        })
      )
    );
    var s;
  }
  class qa {
    constructor(e, t) {
      (this.output = null),
        (this.assertAssetsFinalized = () => {
          for (const [e, t] of this.filesByReferenceId.entries())
            "asset" === t.type &&
              "string" != typeof t.fileName &&
              ws($s(t.name || e));
        }),
        (this.emitFile = (e) =>
          (function(e) {
            return e && ("asset" === e.type || "chunk" === e.type);
          })(e)
            ? (function(e) {
                const t = e.fileName || e.name;
                return !t || ("string" == typeof t && Ps(t));
              })(e)
              ? "chunk" === e.type
                ? this.emitChunk(e)
                : this.emitAsset(e)
              : ws(
                  Ts(
                    `The "fileName" or "name" properties of emitted files must be strings that are neither absolute nor relative paths and do not contain invalid characters, received "${e.fileName ||
                      e.name}".`
                  )
                )
            : ws(
                Ts(
                  `Emitted files must be of type "asset" or "chunk", received "${e &&
                    e.type}".`
                )
              )),
        (this.getFileName = (e) => {
          const t = this.filesByReferenceId.get(e);
          return t
            ? "chunk" === t.type
              ? Ha(t)
              : Ga(t, e)
            : ws(
                (function(e) {
                  return {
                    code: Ns.FILE_NOT_FOUND,
                    message: `Plugin error - Unable to get file name for unknown file "${e}".`,
                  };
                })(e)
              );
        }),
        (this.setAssetSource = (e, t) => {
          const s = this.filesByReferenceId.get(e);
          if (!s)
            return ws(
              (function(e) {
                return {
                  code: Ns.ASSET_NOT_FOUND,
                  message: `Plugin error - Unable to set the source for unknown asset "${e}".`,
                };
              })(e)
            );
          if ("asset" !== s.type)
            return ws(
              Ts(
                `Asset sources can only be set for emitted assets but "${e}" is an emitted chunk.`
              )
            );
          if (void 0 !== s.source)
            return ws(
              (function(e) {
                return {
                  code: Ns.ASSET_SOURCE_ALREADY_SET,
                  message: `Unable to set the source for asset "${e}", source already set.`,
                };
              })(s.name || e)
            );
          const n = za(t, s, e);
          this.output
            ? this.finalizeAsset(s, n, e, this.output)
            : (s.source = n);
        }),
        (this.setOutputBundle = (e, t) => {
          this.output = { assetFileNames: t, bundle: e };
          for (const e of this.filesByReferenceId.values())
            e.fileName && ja(e.fileName, this.output.bundle, this.graph);
          for (const [e, t] of this.filesByReferenceId.entries())
            "asset" === t.type &&
              void 0 !== t.source &&
              this.finalizeAsset(t, t.source, e, this.output);
        }),
        (this.graph = e),
        (this.filesByReferenceId = t
          ? new Map(t.filesByReferenceId)
          : new Map());
    }
    assignReferenceId(e, t) {
      let s;
      do {
        const e = Wa();
        s ? e.update(s) : e.update(t), (s = e.digest("hex").substr(0, 8));
      } while (this.filesByReferenceId.has(s));
      return this.filesByReferenceId.set(s, e), s;
    }
    emitAsset(e) {
      const t = void 0 !== e.source ? za(e.source, e, null) : void 0,
        s = { fileName: e.fileName, name: e.name, source: t, type: "asset" },
        n = this.assignReferenceId(s, e.fileName || e.name || e.type);
      return (
        this.output &&
          (e.fileName && ja(e.fileName, this.output.bundle, this.graph),
          void 0 !== t && this.finalizeAsset(s, t, n, this.output)),
        n
      );
    }
    emitChunk(e) {
      if (
        (this.graph.phase > Ma.LOAD_AND_PARSE &&
          ws({
            code: Ns.INVALID_ROLLUP_PHASE,
            message: "Cannot emit chunks after module loading has finished.",
          }),
        "string" != typeof e.id)
      )
        return ws(
          Ts(
            `Emitted chunks need to have a valid string id, received "${e.id}"`
          )
        );
      const t = {
        fileName: e.fileName,
        module: null,
        name: e.name || e.id,
        type: "chunk",
      };
      return (
        this.graph.moduleLoader
          .addEntryModules(
            [{ fileName: e.fileName || null, id: e.id, name: e.name || null }],
            !1
          )
          .then(({ newEntryModules: [e] }) => {
            t.module = e;
          })
          .catch(() => {}),
        this.assignReferenceId(t, e.id)
      );
    }
    finalizeAsset(e, t, s, n) {
      const i =
          e.fileName ||
          this.findExistingAssetFileNameWithSource(n.bundle, t) ||
          (function(e, t, s) {
            const n = e || "asset";
            return Ni(
              Ii(s.assetFileNames, "output.assetFileNames", {
                hash() {
                  const e = Wa();
                  return (
                    e.update(n),
                    e.update(":"),
                    e.update(t),
                    e.digest("hex").substr(0, 8)
                  );
                },
                ext: () => vt(n).substr(1),
                extname: () => vt(n),
                name: () => n.substr(0, n.length - vt(n).length),
              }),
              s.bundle
            );
          })(e.name, t, n),
        r = Object.assign(Object.assign({}, e), { source: t, fileName: i });
      this.filesByReferenceId.set(s, r);
      const a = this.graph;
      n.bundle[i] = {
        fileName: i,
        get isAsset() {
          return (
            a.warnDeprecation(
              'Accessing "isAsset" on files in the bundle is deprecated, please use "type === \'asset\'" instead',
              !1
            ),
            !0
          );
        },
        source: t,
        type: "asset",
      };
    }
    findExistingAssetFileNameWithSource(e, t) {
      for (const s of Object.keys(e)) {
        const n = e[s];
        if (
          "asset" === n.type &&
          (Buffer.isBuffer(t) && Buffer.isBuffer(n.source)
            ? t.equals(n.source)
            : t === n.source)
        )
          return s;
      }
      return null;
    }
  }
  function Ka(e, t, s, n, i, r) {
    let a = !1;
    return (...o) => (
      a ||
        ((a = !0),
        r.warnDeprecation(
          {
            message: `The "this.${t}" plugin context function used by plugin ${n} is deprecated. The "this.${s}" plugin context function should be used instead.`,
            plugin: n,
          },
          i
        )),
      e(...o)
    );
  }
  function Ya(e, s, n, i) {
    const r = new Set();
    return (a, o) => {
      let h,
        l = !0;
      if (
        ("string" != typeof a.cacheKey &&
          (a.name.startsWith(Ca) || a.name.startsWith(ka) || r.has(a.name)
            ? (l = !1)
            : r.add(a.name)),
        e)
      )
        if (l) {
          const t = a.cacheKey || a.name;
          h = (function(e) {
            return {
              has(t) {
                const s = e[t];
                return !!s && ((s[0] = 0), !0);
              },
              get(t) {
                const s = e[t];
                if (s) return (s[0] = 0), s[1];
              },
              set(t, s) {
                e[t] = [0, s];
              },
              delete: (t) => delete e[t],
            };
          })(e[t] || (e[t] = Object.create(null)));
        } else
          h = (function(e) {
            return {
              has: () => Na(e),
              get: () => Na(e),
              set: () => Na(e),
              delete: () => Na(e),
            };
          })(a.name);
      else h = Ia;
      const c = {
        addWatchFile(e) {
          s.phase >= Ma.GENERATE &&
            this.error({
              code: Ns.INVALID_ROLLUP_PHASE,
              message: "Cannot call addWatchFile after the build has finished.",
            }),
            (s.watchFiles[e] = !0);
        },
        cache: h,
        emitAsset: Ka(
          (e, t) => n.emitFile({ type: "asset", name: e, source: t }),
          "emitAsset",
          "emitFile",
          a.name,
          !1,
          s
        ),
        emitChunk: Ka(
          (e, t) => n.emitFile({ type: "chunk", id: e, name: t && t.name }),
          "emitChunk",
          "emitFile",
          a.name,
          !1,
          s
        ),
        emitFile: n.emitFile,
        error: (e) => Pa(e, a.name),
        getAssetFileName: Ka(
          n.getFileName,
          "getAssetFileName",
          "getFileName",
          a.name,
          !1,
          s
        ),
        getChunkFileName: Ka(
          n.getFileName,
          "getChunkFileName",
          "getFileName",
          a.name,
          !1,
          s
        ),
        getFileName: n.getFileName,
        getModuleInfo(e) {
          const t = s.moduleById.get(e);
          if (null == t) throw new Error(`Unable to find module ${e}`);
          return {
            hasModuleSideEffects: t.moduleSideEffects,
            id: t.id,
            importedIds:
              t instanceof Ct
                ? []
                : Array.from(t.sources).map((e) => t.resolvedIds[e].id),
            isEntry: t instanceof fi && t.isEntryPoint,
            isExternal: t instanceof Ct,
          };
        },
        isExternal: Ka(
          (e, t, n = !1) => s.moduleLoader.isExternal(e, t, n),
          "isExternal",
          "resolve",
          a.name,
          !1,
          s
        ),
        meta: { rollupVersion: t },
        get moduleIds() {
          return s.moduleById.keys();
        },
        parse: s.contextParse,
        resolve: (e, t, n) =>
          s.moduleLoader.resolveId(e, t, n && n.skipSelf ? o : null),
        resolveId: Ka(
          (e, t) => s.moduleLoader.resolveId(e, t).then((e) => e && e.id),
          "resolveId",
          "resolve",
          a.name,
          !1,
          s
        ),
        setAssetSource: n.setAssetSource,
        warn(e) {
          "string" == typeof e && (e = { message: e }),
            e.code && (e.pluginCode = e.code),
            (e.code = "PLUGIN_WARNING"),
            (e.plugin = a.name),
            s.warn(e);
        },
        watcher: i
          ? (() => {
              let e = !1;
              function t(t, s) {
                return (
                  e ||
                    (c.warn({
                      code: "PLUGIN_WATCHER_DEPRECATED",
                      message:
                        "this.watcher usage is deprecated in plugins. Use the watchChange plugin hook and this.addWatchFile() instead.",
                    }),
                    (e = !0)),
                  i.on(t, s)
                );
              }
              return Object.assign(Object.assign({}, i), {
                addListener: t,
                on: t,
              });
            })()
          : void 0,
      };
      return c;
    };
  }
  class Xa {
    constructor(e, t, s, n, i, r) {
      if (
        ((this.previousHooks = new Set(["options"])),
        (function(e, t) {
          for (const { active: s, deprecated: n, replacement: i } of wa)
            for (const r of e)
              n in r &&
                t.warnDeprecation(
                  {
                    message: `The "${n}" hook used by plugin ${r.name} is deprecated. The "${i}" hook should be used instead.`,
                    plugin: r.name,
                  },
                  s
                );
        })(t, e),
        (this.graph = e),
        (this.pluginCache = s),
        (this.preserveSymlinks = n),
        (this.watcher = i),
        (this.fileEmitter = new qa(e, r && r.fileEmitter)),
        (this.emitFile = this.fileEmitter.emitFile),
        (this.getFileName = this.fileEmitter.getFileName),
        (this.finaliseAssets = this.fileEmitter.assertAssetsFinalized),
        (this.setOutputBundle = this.fileEmitter.setOutputBundle),
        (this.plugins = t.concat(r ? r.plugins : [yn(n)])),
        (this.pluginContexts = this.plugins.map(Ya(s, e, this.fileEmitter, i))),
        r)
      )
        for (const s of t)
          for (const t of r.previousHooks)
            t in s &&
              e.warn(
                ((a = s.name),
                (o = t),
                {
                  code: Ns.INPUT_HOOK_IN_OUTPUT_PLUGIN,
                  message: `The "${o}" hook used by the output plugin ${a} is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin.`,
                })
              );
      var a, o;
    }
    createOutputPluginDriver(e) {
      return new Xa(
        this.graph,
        e,
        this.pluginCache,
        this.preserveSymlinks,
        this.watcher,
        this
      );
    }
    hookFirst(e, t, s, n) {
      let i = Promise.resolve();
      for (let r = 0; r < this.plugins.length; r++)
        n !== r &&
          (i = i.then((n) => (null != n ? n : this.runHook(e, t, r, !1, s))));
      return i;
    }
    hookFirstSync(e, t, s) {
      for (let n = 0; n < this.plugins.length; n++) {
        const i = this.runHookSync(e, t, n, s);
        if (null != i) return i;
      }
      return null;
    }
    hookParallel(e, t, s) {
      const n = [];
      for (let i = 0; i < this.plugins.length; i++) {
        const r = this.runHook(e, t, i, !1, s);
        r && n.push(r);
      }
      return Promise.all(n).then(() => {});
    }
    hookReduceArg0(e, [t, ...s], n, i) {
      let r = Promise.resolve(t);
      for (let t = 0; t < this.plugins.length; t++)
        r = r.then((r) => {
          const a = this.runHook(e, [r, ...s], t, !1, i);
          return a
            ? a.then((e) =>
                n.call(this.pluginContexts[t], r, e, this.plugins[t])
              )
            : r;
        });
      return r;
    }
    hookReduceArg0Sync(e, [t, ...s], n, i) {
      for (let r = 0; r < this.plugins.length; r++) {
        const a = this.runHookSync(e, [t, ...s], r, i);
        t = n.call(this.pluginContexts[r], t, a, this.plugins[r]);
      }
      return t;
    }
    hookReduceValue(e, t, s, n, i) {
      let r = Promise.resolve(t);
      for (let t = 0; t < this.plugins.length; t++)
        r = r.then((r) => {
          const a = this.runHook(e, s, t, !0, i);
          return a
            ? a.then((e) =>
                n.call(this.pluginContexts[t], r, e, this.plugins[t])
              )
            : r;
        });
      return r;
    }
    hookReduceValueSync(e, t, s, n, i) {
      let r = t;
      for (let t = 0; t < this.plugins.length; t++) {
        const a = this.runHookSync(e, s, t, i);
        r = n.call(this.pluginContexts[t], r, a, this.plugins[t]);
      }
      return r;
    }
    hookSeq(t, s, n) {
      return e(this, void 0, void 0, function*() {
        let e = Promise.resolve();
        for (let i = 0; i < this.plugins.length; i++)
          e = e.then(() => this.runHook(t, s, i, !1, n));
        return e;
      });
    }
    hookSeqSync(e, t, s) {
      for (let n = 0; n < this.plugins.length; n++)
        this.runHookSync(e, t, n, s);
    }
    runHook(e, t, s, n, i) {
      this.previousHooks.add(e);
      const r = this.plugins[s],
        a = r[e];
      if (!a) return;
      let o = this.pluginContexts[s];
      return (
        i && (o = i(o, r)),
        Promise.resolve()
          .then(() => {
            if ("function" != typeof a) {
              if (n) return a;
              ws({
                code: "INVALID_PLUGIN_HOOK",
                message: `Error running plugin hook ${e} for ${r.name}, expected a function hook.`,
              });
            }
            return a.apply(o, t);
          })
          .catch((t) => Pa(t, r.name, { hook: e }))
      );
    }
    runHookSync(e, t, s, n) {
      this.previousHooks.add(e);
      const i = this.plugins[s];
      let r = this.pluginContexts[s];
      const a = i[e];
      if (a) {
        n && (r = n(r, i));
        try {
          return (
            "function" != typeof a &&
              ws({
                code: "INVALID_PLUGIN_HOOK",
                message: `Error running plugin hook ${e} for ${i.name}, expected a function hook.`,
              }),
            a.apply(r, t)
          );
        } catch (t) {
          return Pa(t, i.name, { hook: e });
        }
      }
    }
  }
  function Qa(e) {
    return "string" == typeof e
      ? [{ fileName: null, name: null, id: e }]
      : Array.isArray(e)
      ? e.map((e) => ({ fileName: null, name: null, id: e }))
      : Object.keys(e).map((t) => ({ fileName: null, id: e[t], name: t }));
  }
  class Ja {
    constructor(e, t) {
      if (
        ((this.moduleById = new Map()),
        (this.needsTreeshakingPass = !1),
        (this.phase = Ma.LOAD_AND_PARSE),
        (this.watchFiles = Object.create(null)),
        (this.externalModules = []),
        (this.modules = []),
        (this.onwarn =
          e.onwarn ||
          (function() {
            const e = Object.create(null);
            return (t) => {
              const s = t.toString();
              s in e || (console.error(s), (e[s] = !0));
            };
          })()),
        (this.deoptimizationTracker = new ee()),
        (this.cachedModules = new Map()),
        e.cache && e.cache.modules)
      )
        for (const t of e.cache.modules) this.cachedModules.set(t.id, t);
      if (!1 !== e.cache) {
        this.pluginCache = (e.cache && e.cache.plugins) || Object.create(null);
        for (const e in this.pluginCache) {
          const t = this.pluginCache[e];
          for (const e of Object.keys(t)) t[e][0]++;
        }
      }
      if (
        ((this.preserveModules = e.preserveModules),
        (this.strictDeprecations = e.strictDeprecations),
        (this.cacheExpiry = e.experimentalCacheExpiry),
        !1 !== e.treeshake &&
          ((this.treeshakingOptions = e.treeshake
            ? {
                annotations: !1 !== e.treeshake.annotations,
                moduleSideEffects: e.treeshake.moduleSideEffects,
                propertyReadSideEffects:
                  !1 !== e.treeshake.propertyReadSideEffects,
                pureExternalModules: e.treeshake.pureExternalModules,
                tryCatchDeoptimization:
                  !1 !== e.treeshake.tryCatchDeoptimization,
                unknownGlobalSideEffects:
                  !1 !== e.treeshake.unknownGlobalSideEffects,
              }
            : {
                annotations: !0,
                moduleSideEffects: !0,
                propertyReadSideEffects: !0,
                tryCatchDeoptimization: !0,
                unknownGlobalSideEffects: !0,
              }),
          void 0 !== this.treeshakingOptions.pureExternalModules &&
            this.warnDeprecation(
              'The "treeshake.pureExternalModules" option is deprecated. The "treeshake.moduleSideEffects" option should be used instead. "treeshake.pureExternalModules: true" is equivalent to "treeshake.moduleSideEffects: \'no-external\'"',
              !1
            )),
        (this.contextParse = (e, t = {}) =>
          this.acornParser.parse(
            e,
            Object.assign(
              Object.assign(Object.assign({}, ui), t),
              this.acornOptions
            )
          )),
        (this.pluginDriver = new Xa(
          this,
          e.plugins,
          this.pluginCache,
          !0 === e.preserveSymlinks,
          t
        )),
        t)
      ) {
        const e = (e) => this.pluginDriver.hookSeqSync("watchChange", [e]);
        t.on("change", e),
          t.once("restart", () => {
            t.removeListener("change", e);
          });
      }
      (this.shimMissingExports = e.shimMissingExports),
        (this.scope = new Aa()),
        (this.context = String(e.context));
      const s = e.moduleContext;
      if ("function" == typeof s)
        this.getModuleContext = (e) => s(e) || this.context;
      else if ("object" == typeof s) {
        const e = new Map();
        for (const t in s) e.set(At(t), s[t]);
        this.getModuleContext = (t) => e.get(t) || this.context;
      } else this.getModuleContext = () => this.context;
      this.acornOptions = e.acorn ? Object.assign({}, e.acorn) : {};
      const n = [];
      n.push(va, xa),
        e.experimentalTopLevelAwait &&
          (this.acornOptions.allowAwaitOutsideFunction = !0);
      const i = e.acornInjectPlugins;
      n.push(...(Array.isArray(i) ? i : i ? [i] : [])),
        (this.acornParser = vr.extend(...n)),
        (this.moduleLoader = new Ra(
          this,
          this.moduleById,
          this.pluginDriver,
          e.external,
          "function" == typeof e.manualChunks && e.manualChunks,
          this.treeshakingOptions
            ? this.treeshakingOptions.moduleSideEffects
            : null,
          !!this.treeshakingOptions &&
            this.treeshakingOptions.pureExternalModules
        ));
    }
    build(e, t, s) {
      return (
        ai("parse modules", 2),
        Promise.all([
          this.moduleLoader.addEntryModules(Qa(e), !0),
          t && "object" == typeof t && this.moduleLoader.addManualChunks(t),
        ]).then(([{ entryModules: e, manualChunkModulesByAlias: t }]) => {
          if (0 === e.length)
            throw new Error("You must supply options.input to rollup");
          for (const e of this.moduleById.values())
            e instanceof fi
              ? this.modules.push(e)
              : this.externalModules.push(e);
          if (
            (oi("parse modules", 2),
            (this.phase = Ma.ANALYSE),
            ai("analyse dependency graph", 2),
            this.link(e),
            oi("analyse dependency graph", 2),
            ai("mark included statements", 2),
            s && e.length > 1)
          )
            throw new Error(
              "Internal Error: can only inline dynamic imports for single-file builds."
            );
          for (const t of e) t.includeAllExports();
          this.includeMarked(this.modules);
          for (const e of this.externalModules) e.warnUnusedImports();
          oi("mark included statements", 2),
            ai("generate chunks", 2),
            this.preserveModules ||
              s ||
              (function(e, t) {
                let s, n, i;
                const r = new Set(),
                  a = [],
                  o = (e) => {
                    s.manualChunkAlias
                      ? ((e.manualChunkAlias = s.manualChunkAlias),
                        (e.entryPointsHash = n))
                      : (function(e, t) {
                          for (let s = 0; s < e.length; s++) e[s] = e[s] ^ t[s];
                        })(e.entryPointsHash, n);
                    for (const t of e.dependencies)
                      t instanceof Ct ||
                        i.has(t.id) ||
                        (i.add(t.id),
                        r.has(t.id) || t.manualChunkAlias || o(t));
                    for (const { resolution: t } of e.dynamicImports)
                      t instanceof fi &&
                        t.dynamicallyImportedBy.length > 0 &&
                        !t.manualChunkAlias &&
                        a.push(t);
                  };
                if (t)
                  for (const e of Object.keys(t))
                    for (s of ((n = Fa(10)), t[e])) (i = new Set(s.id)), o(s);
                for (s of e)
                  r.add(s.id),
                    (n = Fa(10)),
                    (i = new Set(s.id)),
                    s.manualChunkAlias || o(s);
                for (s of a)
                  r.has(s.id) ||
                    (r.add(s.id), (n = Fa(10)), (i = new Set(s.id)), o(s));
              })(e, t);
          let n = [];
          if (this.preserveModules)
            for (const e of this.modules) {
              const t = new Ti(this, [e]);
              (!e.isEntryPoint && t.isEmpty) || (t.entryModules = [e]),
                n.push(t);
            }
          else {
            const e = {};
            for (const t of this.modules) {
              const s = Ba(t.entryPointsHash),
                n = e[s];
              n ? n.push(t) : (e[s] = [t]);
            }
            for (const t in e) {
              const s = e[t];
              Ci(s);
              const i = new Ti(this, s);
              n.push(i);
            }
          }
          for (const e of n) e.link();
          n = n.filter(Li);
          const i = [];
          for (const e of n) i.push(...e.generateFacades());
          return (
            oi("generate chunks", 2), (this.phase = Ma.GENERATE), n.concat(i)
          );
        })
      );
    }
    getCache() {
      for (const e in this.pluginCache) {
        const t = this.pluginCache[e];
        let s = !0;
        for (const e of Object.keys(t))
          t[e][0] >= this.cacheExpiry ? delete t[e] : (s = !1);
        s && delete this.pluginCache[e];
      }
      return {
        modules: this.modules.map((e) => e.toJSON()),
        plugins: this.pluginCache,
      };
    }
    includeMarked(e) {
      if (this.treeshakingOptions) {
        let t = 1;
        do {
          ai(`treeshaking pass ${t}`, 3), (this.needsTreeshakingPass = !1);
          for (const t of e) t.isExecuted && t.include();
          oi(`treeshaking pass ${t++}`, 3);
        } while (this.needsTreeshakingPass);
      } else for (const t of e) t.includeAllInBundle();
    }
    warn(e) {
      (e.toString = () => {
        let t = "";
        return (
          e.plugin && (t += `(${e.plugin} plugin) `),
          e.loc && (t += `${ks(e.loc.file)} (${e.loc.line}:${e.loc.column}) `),
          (t += e.message)
        );
      }),
        this.onwarn(e);
    }
    warnDeprecation(e, t) {
      if (t || this.strictDeprecations) {
        const t = _s(e);
        if (this.strictDeprecations) return ws(t);
        this.warn(t);
      }
    }
    link(e) {
      for (const e of this.modules) e.linkDependencies();
      const { orderedModules: t, cyclePaths: s } = (function(e) {
        let t = 0;
        const s = [],
          n = {},
          i = [],
          r = [],
          a = {},
          o = (e) => {
            if (!n[e.id]) {
              if (e instanceof Ct)
                return (e.execIndex = t++), void (n[e.id] = !0);
              for (const t of e.dependencies)
                t.id in a
                  ? n[t.id] || s.push(ki(t.id, e.id, a))
                  : ((a[t.id] = e.id), o(t));
              for (const { resolution: t } of e.dynamicImports)
                t instanceof fi && -1 === r.indexOf(t) && r.push(t);
              (e.execIndex = t++), (n[e.id] = !0), i.push(e);
            }
          };
        for (const t of e) a[t.id] || ((a[t.id] = null), o(t));
        for (const e of r) a[e.id] || ((a[e.id] = null), o(e));
        return { orderedModules: i, cyclePaths: s };
      })(e);
      for (const e of s)
        this.warn({
          code: "CIRCULAR_DEPENDENCY",
          importer: e[0],
          message: `Circular dependency: ${e.join(" -> ")}`,
        });
      this.modules = t;
      for (const e of this.modules) e.bindReferences();
      this.warnForMissingExports();
    }
    warnForMissingExports() {
      for (const e of this.modules)
        for (const t of Object.keys(e.importDescriptions)) {
          const s = e.importDescriptions[t];
          "*" === s.name ||
            s.module.getVariableForExportName(s.name) ||
            e.warn(
              {
                code: "NON_EXISTENT_EXPORT",
                message: `Non-existent export '${s.name}' is imported from ${ks(
                  s.module.id
                )}`,
                name: s.name,
                source: s.module.id,
              },
              s.start
            );
        }
    }
  }
  function Za(e) {
    switch (typeof e) {
      case "function":
        return e();
      case "string":
        return e;
      default:
        return "";
    }
  }
  const eo = (e, t) => (t ? `${e}\n${t}` : e),
    to = (e, t) => (t ? `${e}\n\n${t}` : e);
  function so(e, t) {
    ws({
      code: "INVALID_EXPORT_OPTION",
      message: `'${e}' was specified for output.exports, but entry module has following exports: ${t.join(
        ", "
      )}`,
    });
  }
  function no(e, { exports: t, name: s, format: n }) {
    const i = e.getExportNames();
    return (
      "default" === t
        ? (1 === i.length && "default" === i[0]) || so("default", i)
        : "none" === t && i.length && so("none", i),
      (t && "auto" !== t) ||
        (0 === i.length
          ? (t = "none")
          : 1 === i.length && "default" === i[0]
          ? (t = "default")
          : (null !== e.facadeModule &&
              e.facadeModule.isEntryPoint &&
              "es" !== n &&
              -1 !== i.indexOf("default") &&
              e.graph.warn({
                code: "MIXED_EXPORTS",
                message: `Using named and default exports together. Consumers of your bundle will have to use ${s ||
                  "bundle"}['default'] to access the default export, which may not be what you want. Use \`output.exports: 'named'\` to disable this warning`,
                url: "https://rollupjs.org/guide/en/#output-exports",
              }),
            (t = "named"))),
      /(?:default|named|none)/.test(t) ||
        ws({
          code: "INVALID_EXPORT_OPTION",
          message:
            "output.exports must be 'default', 'named', 'none', 'auto', or left unspecified (defaults to 'auto')",
          url: "https://rollupjs.org/guide/en/#output-exports",
        }),
      t
    );
  }
  const io = (e, t) => (s, n) =>
      void 0 !== t[s] ? t[s] : void 0 !== e[s] ? e[s] : n,
    ro = (e) => (e && "object" != typeof e ? {} : e),
    ao = (e, t, s) => {
      const n = ro(t[s]),
        i = ro(e[s]);
      return void 0 !== n
        ? n && i
          ? Object.assign(Object.assign({}, i), n)
          : n
        : i;
    },
    oo = (e) => {
      "string" == typeof e ? console.warn(e) : console.warn(e.message);
    },
    ho = (e, t = oo) => (e.onwarn ? (s) => e.onwarn(s, t) : t),
    lo = (e, t) => {
      const s = e.external;
      return "function" == typeof s
        ? (e, ...n) => s(e, ...n) || -1 !== t.external.indexOf(e)
        : ("string" == typeof e.external
            ? [s]
            : Array.isArray(s)
            ? s
            : []
          ).concat(t.external);
    },
    co = {
      c: "config",
      d: "dir",
      e: "external",
      f: "format",
      g: "globals",
      h: "help",
      i: "input",
      m: "sourcemap",
      n: "name",
      o: "file",
      v: "version",
      w: "watch",
    };
  function uo({ config: e = {}, command: t = {}, defaultOnWarnHandler: s }) {
    const n = (function(e) {
        const t =
          e.external && "string" == typeof e.external
            ? e.external.split(",")
            : [];
        return Object.assign(Object.assign({}, e), {
          external: t,
          globals:
            "string" == typeof e.globals
              ? e.globals.split(",").reduce((e, s) => {
                  const [n, i] = s.split(":");
                  return (e[n] = i), -1 === t.indexOf(n) && t.push(n), e;
                }, Object.create(null))
              : void 0,
        });
      })(t),
      i = (function(e, t = { external: [], globals: void 0 }, s) {
        const n = io(e, t),
          i = {
            acorn: e.acorn,
            acornInjectPlugins: e.acornInjectPlugins,
            cache: n("cache"),
            chunkGroupingSize: n("chunkGroupingSize", 5e3),
            context: n("context"),
            experimentalCacheExpiry: n("experimentalCacheExpiry", 10),
            experimentalOptimizeChunks: n("experimentalOptimizeChunks"),
            experimentalTopLevelAwait: n("experimentalTopLevelAwait"),
            external: lo(e, t),
            inlineDynamicImports: n("inlineDynamicImports", !1),
            input: n("input", []),
            manualChunks: n("manualChunks"),
            moduleContext: e.moduleContext,
            onwarn: ho(e, s),
            perf: n("perf", !1),
            plugins: e.plugins,
            preserveModules: n("preserveModules"),
            preserveSymlinks: n("preserveSymlinks"),
            shimMissingExports: n("shimMissingExports"),
            strictDeprecations: n("strictDeprecations", !1),
            treeshake: ao(e, t, "treeshake"),
            watch: e.watch,
          };
        i.cache && i.cache.cache && (i.cache = i.cache.cache);
        return i;
      })(e, n, s);
    n.output && Object.assign(n, n.output);
    const r = e.output,
      a = Array.isArray(r) ? r : r ? [r] : [];
    0 === a.length && a.push({});
    const o = a.map((e) =>
        (function(e, t = {}) {
          const s = io(e, t);
          let n = s("format");
          switch (n) {
            case "esm":
            case "module":
              n = "es";
              break;
            case "commonjs":
              n = "cjs";
          }
          return {
            amd: Object.assign(Object.assign({}, e.amd), t.amd),
            assetFileNames: s("assetFileNames"),
            banner: s("banner"),
            chunkFileNames: s("chunkFileNames"),
            compact: s("compact", !1),
            dir: s("dir"),
            dynamicImportFunction: s("dynamicImportFunction"),
            entryFileNames: s("entryFileNames"),
            esModule: s("esModule", !0),
            exports: s("exports"),
            extend: s("extend"),
            externalLiveBindings: s("externalLiveBindings", !0),
            file: s("file"),
            footer: s("footer"),
            format: "esm" === n ? "es" : n,
            freeze: s("freeze", !0),
            globals: s("globals"),
            indent: s("indent", !0),
            interop: s("interop", !0),
            intro: s("intro"),
            name: s("name"),
            namespaceToStringTag: s("namespaceToStringTag", !1),
            noConflict: s("noConflict"),
            outro: s("outro"),
            paths: s("paths"),
            plugins: e.plugins,
            preferConst: s("preferConst"),
            sourcemap: s("sourcemap"),
            sourcemapExcludeSources: s("sourcemapExcludeSources"),
            sourcemapFile: s("sourcemapFile"),
            sourcemapPathTransform: s("sourcemapPathTransform"),
            strict: s("strict", !0),
          };
        })(e, n)
      ),
      h = [],
      l = Object.keys(i);
    po(h, Object.keys(e), l, "input option", /^output$/);
    const c = Object.keys(o[0]);
    po(
      h,
      o.reduce((e, t) => e.concat(Object.keys(t)), []),
      c,
      "output option"
    );
    const u = c.filter((e) => "sourcemapPathTransform" !== e);
    return (
      po(
        h,
        Object.keys(n),
        l.concat(u, Object.keys(co), "config", "environment", "silent"),
        "CLI flag",
        /^_|output|(config.*)$/
      ),
      {
        inputOptions: i,
        optionError: h.length > 0 ? h.join("\n") : null,
        outputOptions: o,
      }
    );
  }
  function po(e, t, s, n, i = /$./) {
    const r = new Set(s),
      a = t.filter((e) => !r.has(e) && !i.test(e));
    a.length > 0 &&
      e.push(
        `Unknown ${n}: ${a.join(", ")}. Allowed options: ${Array.from(r)
          .sort()
          .join(", ")}`
      );
  }
  const fo = {
    get() {
      throw new Error(
        "bundle.generate(...) now returns a Promise instead of a { code, map } object"
      );
    },
  };
  function mo(e, s) {
    return (
      (s.options && s.options.call({ meta: { rollupVersion: t } }, e)) || e
    );
  }
  function go(e) {
    return Array.isArray(e) ? e.filter(Boolean) : e ? [e] : [];
  }
  function xo(e, t) {
    const s = go(e);
    for (let e = 0; e < s.length; e++) {
      const n = s[e];
      n.name || (n.name = `${t}${e + 1}`);
    }
    return s;
  }
  let yo;
  function Eo(t) {
    return e(this, void 0, void 0, function*() {
      const s = (function(e) {
        if (!e) throw new Error("You must supply an options object to rollup");
        let { inputOptions: t, optionError: s } = uo({ config: e });
        return (
          s && t.onwarn({ message: s, code: "UNKNOWN_OPTION" }),
          ((t = go(t.plugins).reduce(mo, t)).plugins = xo(t.plugins, Ca)),
          t.inlineDynamicImports
            ? (t.preserveModules &&
                ws({
                  code: "INVALID_OPTION",
                  message:
                    '"preserveModules" does not support the "inlineDynamicImports" option.',
                }),
              t.manualChunks &&
                ws({
                  code: "INVALID_OPTION",
                  message:
                    '"manualChunks" option is not supported for "inlineDynamicImports".',
                }),
              t.experimentalOptimizeChunks &&
                ws({
                  code: "INVALID_OPTION",
                  message:
                    '"experimentalOptimizeChunks" option is not supported for "inlineDynamicImports".',
                }),
              ((t.input instanceof Array && t.input.length > 1) ||
                ("object" == typeof t.input &&
                  Object.keys(t.input).length > 1)) &&
                ws({
                  code: "INVALID_OPTION",
                  message:
                    'Multiple inputs are not supported for "inlineDynamicImports".',
                }))
            : t.preserveModules &&
              (t.manualChunks &&
                ws({
                  code: "INVALID_OPTION",
                  message:
                    '"preserveModules" does not support the "manualChunks" option.',
                }),
              t.experimentalOptimizeChunks &&
                ws({
                  code: "INVALID_OPTION",
                  message:
                    '"preserveModules" does not support the "experimentalOptimizeChunks" option.',
                })),
          t
        );
      })(t);
      ci(s);
      const n = new Ja(s, yo);
      yo = void 0;
      const i = !1 !== t.cache;
      let r;
      delete s.cache, delete t.cache, ai("BUILD", 1);
      try {
        yield n.pluginDriver.hookParallel("buildStart", [s]),
          (r = yield n.build(s.input, s.manualChunks, s.inlineDynamicImports));
      } catch (e) {
        const t = Object.keys(n.watchFiles);
        throw (t.length > 0 && (e.watchFiles = t),
        yield n.pluginDriver.hookParallel("buildEnd", [e]),
        e);
      }
      yield n.pluginDriver.hookParallel("buildEnd", []), oi("BUILD", 1);
      let a = !1;
      function o(e) {
        if (!e) throw new Error("You must supply an options object");
        const t = n.pluginDriver.createOutputPluginDriver(xo(e.plugins, ka));
        return {
          outputOptions: Ao(s, e, r.length > 1, t),
          outputPluginDriver: t,
        };
      }
      function h(t, i, o) {
        return e(this, void 0, void 0, function*() {
          ai("GENERATE", 1);
          const e = t.assetFileNames || "assets/[name]-[hash][extname]",
            h = (function(e) {
              if (0 === e.length) return "/";
              if (1 === e.length) return bt(e[0]);
              const t = e.slice(1).reduce((e, t) => {
                const s = t.split(/\/+|\\+/);
                let n;
                for (
                  n = 0;
                  e[n] === s[n] && n < Math.min(e.length, s.length);
                  n++
                );
                return e.slice(0, n);
              }, e[0].split(/\/+|\\+/));
              return t.length > 1 ? t.join("/") : "/";
            })(
              (function(e) {
                const t = [];
                for (const s of e)
                  for (const e of s.entryModules) gt(e.id) && t.push(e.id);
                return t;
              })(r)
            ),
            l = Object.create(null);
          let c;
          o.setOutputBundle(l, e);
          try {
            yield o.hookParallel("renderStart", [t, s]);
            const e = yield (function(e, t) {
              return Promise.all([
                t.hookReduceValue("banner", Za(e.banner), [], eo),
                t.hookReduceValue("footer", Za(e.footer), [], eo),
                t.hookReduceValue("intro", Za(e.intro), [], to),
                t.hookReduceValue("outro", Za(e.outro), [], to),
              ])
                .then(
                  ([e, t, s, n]) => (
                    s && (s += "\n\n"),
                    n && (n = `\n\n${n}`),
                    e.length && (e += "\n"),
                    t.length && (t = "\n" + t),
                    { intro: s, outro: n, banner: e, footer: t }
                  )
                )
                .catch((e) => {
                  ws({
                    code: "ADDON_ERROR",
                    message: `Could not retrieve ${e.hook}. Check configuration of plugin ${e.plugin}.\n\tError Message: ${e.message}`,
                  });
                });
            })(t, o);
            for (const e of r)
              s.preserveModules || e.generateInternalExports(t),
                e.facadeModule &&
                  e.facadeModule.isEntryPoint &&
                  (e.exportMode = no(e, t));
            for (const e of r) e.preRender(t, h);
            !a &&
              s.experimentalOptimizeChunks &&
              (!(function(e, t, s, n) {
                for (let i = 0; i < e.length; i++) {
                  const r = e[i],
                    a = [];
                  if (
                    (r.visitStaticDependenciesUntilCondition((e) => {
                      e instanceof Ti && a.push(e);
                    }),
                    a.length < 2)
                  )
                    continue;
                  let o = 1,
                    h = !0,
                    l = void 0,
                    c = a[0],
                    u = a[1];
                  const d = (e) =>
                    null === e.facadeModule &&
                    null === e.manualChunkAlias &&
                    !(!u || null !== u.facadeModule) &&
                      !(e.getRenderedSourceLength() > s);
                  do {
                    if (h) {
                      d(c) && (h = !1);
                      continue;
                    }
                    let r =
                      s -
                      l.getRenderedSourceLength() -
                      c.getRenderedSourceLength();
                    if (r <= 0) {
                      d(c) || (h = !0);
                      continue;
                    }
                    const p = new Set();
                    c.visitStaticDependenciesUntilCondition((e) => p.add(e));
                    const f = new Set([c, l]);
                    if (
                      l.visitStaticDependenciesUntilCondition(
                        (e) =>
                          e !== c &&
                          e !== l &&
                          !p.has(e) &&
                            (e instanceof Ct ||
                              (r -= e.getRenderedSourceLength()) <= 0 ||
                                void f.add(e))
                      )
                    ) {
                      d(c) || (h = !0);
                      continue;
                    }
                    if (
                      c.visitStaticDependenciesUntilCondition(
                        (e) =>
                          !f.has(e) &&
                          (e instanceof Ct ||
                            (r -= e.getRenderedSourceLength()) <= 0 || void 0)
                      )
                    ) {
                      d(c) || (h = !0);
                      continue;
                    }
                    const m = e.indexOf(c);
                    m <= i && i--,
                      e.splice(m, 1),
                      l.merge(c, e, t, n),
                      a.splice(--o, 1),
                      (c = l),
                      u && !d(u) && (h = !0);
                  } while (((l = c), (c = u), (u = a[++o]), c));
                }
              })(r, t, s.chunkGroupingSize, h),
              (a = !0)),
              (function(e, t, s, n, i, r, a) {
                const o = [],
                  h = [];
                for (const t of e)
                  (t.facadeModule && t.facadeModule.isUserDefinedEntryPoint
                    ? o
                    : h
                  ).push(t);
                const l = o.concat(h);
                for (const e of l)
                  s.file
                    ? (e.id = Et(s.file))
                    : t.preserveModules
                    ? (e.id = e.generateIdPreserveModules(n, s, r))
                    : (e.id = e.generateId(i, s, r, !0, a)),
                    (r[e.id] = Ua);
              })(r, s, t, h, e, l, o),
              (c = (function(e, t) {
                for (let s = 0; s < e.length; s++) {
                  const n = e[s],
                    i = n.facadeModule;
                  t[n.id] = {
                    code: void 0,
                    dynamicImports: n.getDynamicImportIds(),
                    exports: n.getExportNames(),
                    facadeModuleId: i && i.id,
                    fileName: n.id,
                    imports: n.getImportIds(),
                    isDynamicEntry:
                      null !== i && i.dynamicallyImportedBy.length > 0,
                    isEntry: null !== i && i.isEntryPoint,
                    map: void 0,
                    modules: n.renderedModules,
                    get name() {
                      return n.getChunkName();
                    },
                    type: "chunk",
                  };
                }
                return t;
              })(r, l)),
              yield Promise.all(
                r.map((s) => {
                  const n = l[s.id];
                  return s
                    .render(t, e, n, o)
                    .then(
                      (e) => (
                        (n.code = e.code),
                        (n.map = e.map),
                        o.hookParallel("ongenerate", [
                          Object.assign({ bundle: n }, t),
                          n,
                        ])
                      )
                    );
                })
              );
          } catch (e) {
            throw (yield o.hookParallel("renderError", [e]), e);
          }
          yield o.hookSeq("generateBundle", [t, c, i]);
          for (const e of Object.keys(c)) {
            const t = c[e];
            t.type ||
              (n.warnDeprecation(
                'A plugin is directly adding properties to the bundle object in the "generateBundle" hook. This is deprecated and will be removed in a future Rollup version, please use "this.emitFile" instead.',
                !1
              ),
              (t.type = "asset"));
          }
          return o.finaliseAssets(), oi("GENERATE", 1), c;
        });
      }
      const l = {
        cache: i ? n.getCache() : void 0,
        generate: (e) => {
          const { outputOptions: t, outputPluginDriver: s } = o(e),
            n = h(t, !1, s).then((e) => So(e));
          return (
            Object.defineProperty(n, "code", fo),
            Object.defineProperty(n, "map", fo),
            n
          );
        },
        watchFiles: Object.keys(n.watchFiles),
        write: (t) => {
          const { outputOptions: n, outputPluginDriver: i } = o(t);
          return (
            n.dir ||
              n.file ||
              ws({
                code: "MISSING_OPTION",
                message:
                  'You must specify "output.file" or "output.dir" for the build.',
              }),
            h(n, !0, i).then((t) =>
              e(this, void 0, void 0, function*() {
                let e = 0;
                for (const s of Object.keys(t)) {
                  if ("asset" !== t[s].type && ++e > 1) break;
                }
                return (
                  e > 1 &&
                    (n.sourcemapFile &&
                      ws({
                        code: "INVALID_OPTION",
                        message:
                          '"output.sourcemapFile" is only supported for single-file builds.',
                      }),
                    "string" == typeof n.file &&
                      ws({
                        code: "INVALID_OPTION",
                        message:
                          'When building multiple chunks, the "output.dir" option must be used, not "output.file".' +
                          ("string" != typeof s.input ||
                          !0 === s.inlineDynamicImports
                            ? ""
                            : ' To inline dynamic imports, set the "inlineDynamicImports" option.'),
                      })),
                  yield Promise.all(
                    Object.keys(t).map((e) =>
                      (function(e, t, s, n) {
                        const i = At(s.dir || bt(s.file), t.fileName);
                        let r, a;
                        if ("asset" === t.type) a = t.source;
                        else if (((a = t.code), s.sourcemap && t.map)) {
                          let e;
                          "inline" === s.sourcemap
                            ? (e = t.map.toUrl())
                            : ((e = `${Et(t.fileName)}.map`),
                              (r = xn(`${i}.map`, t.map.toString()))),
                            "hidden" !== s.sourcemap &&
                              (a += `//# ${Kn}=${e}\n`);
                        }
                        return xn(i, a)
                          .then(() => r)
                          .then(
                            () =>
                              "chunk" === t.type &&
                              n.hookSeq("onwrite", [
                                Object.assign({ bundle: e }, s),
                                t,
                              ])
                          )
                          .then(() => {});
                      })(l, t[e], n, i)
                    )
                  ),
                  yield i.hookParallel("writeBundle", [t]),
                  So(t)
                );
              })
            )
          );
        },
      };
      return !0 === s.perf && (l.getTimings = ri), l;
    });
  }
  var bo;
  function vo(e) {
    return "asset" === e.type
      ? bo.ASSET
      : e.isEntry
      ? bo.ENTRY_CHUNK
      : bo.SECONDARY_CHUNK;
  }
  function So(e) {
    return {
      output: Object.keys(e)
        .map((t) => e[t])
        .filter((e) => Object.keys(e).length > 0)
        .sort((e, t) => {
          const s = vo(e),
            n = vo(t);
          return s === n ? 0 : s < n ? -1 : 1;
        }),
    };
  }
  function Ao(e, t, s, n) {
    const i = uo({
      config: {
        output: Object.assign(
          Object.assign(Object.assign({}, t), t.output),
          e.output
        ),
      },
    });
    if (i.optionError) throw new Error(i.optionError);
    const r = i.outputOptions[0],
      a = n.hookReduceArg0Sync(
        "outputOptions",
        [r],
        (e, t) => t || e,
        (e) => {
          const t = () =>
            e.error({
              code: Ns.CANNOT_EMIT_FROM_OPTIONS_HOOK,
              message:
                'Cannot emit files or set asset sources in the "outputOptions" hook, use the "renderStart" hook instead.',
            });
          return Object.assign(Object.assign({}, e), {
            emitFile: t,
            setAssetSource: t,
          });
        }
      );
    var o;
    return (
      "es6" === (o = a).format &&
        ws(
          _s({
            message:
              'The "es6" output format is deprecated – use "esm" instead',
            url: "https://rollupjs.org/guide/en/#output-format",
          })
        ),
      ["amd", "cjs", "system", "es", "iife", "umd"].indexOf(o.format) < 0 &&
        ws({
          message:
            'You must specify "output.format", which can be one of "amd", "cjs", "system", "esm", "iife" or "umd".',
          url: "https://rollupjs.org/guide/en/#output-format",
        }),
      "string" == typeof a.file &&
        ("string" == typeof a.dir &&
          ws({
            code: "INVALID_OPTION",
            message:
              'You must set either "output.file" for a single-file build or "output.dir" when generating multiple chunks.',
          }),
        e.preserveModules &&
          ws({
            code: "INVALID_OPTION",
            message:
              'You must set "output.dir" instead of "output.file" when using the "preserveModules" option.',
          }),
        "object" != typeof e.input ||
          Array.isArray(e.input) ||
          ws({
            code: "INVALID_OPTION",
            message:
              'You must set "output.dir" instead of "output.file" when providing named inputs.',
          })),
      s &&
        (("umd" !== a.format && "iife" !== a.format) ||
          ws({
            code: "INVALID_OPTION",
            message:
              "UMD and IIFE output formats are not supported for code-splitting builds.",
          }),
        "string" == typeof a.file &&
          ws({
            code: "INVALID_OPTION",
            message:
              'You must set "output.dir" instead of "output.file" when generating multiple chunks.',
          })),
      a
    );
  }
  !(function(e) {
    (e[(e.ENTRY_CHUNK = 0)] = "ENTRY_CHUNK"),
      (e[(e.SECONDARY_CHUNK = 1)] = "SECONDARY_CHUNK"),
      (e[(e.ASSET = 2)] = "ASSET");
  })(bo || (bo = {}));

  // Reserved word lists for various dialects of the language

  var reservedWords = {
    3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
    5: "class enum extends super const export import",
    6: "enum",
    strict:
      "implements interface let package private protected public static yield",
    strictBind: "eval arguments",
  };

  // And the keywords

  var ecma5AndLessKeywords =
    "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

  var keywords = {
    5: ecma5AndLessKeywords,
    "5module": ecma5AndLessKeywords + " export import",
    6: ecma5AndLessKeywords + " const class extends export import super",
  };

  var keywordRelationalOperator = /^in(stanceof)?$/;

  // ## Character categories

  // Big ugly regular expressions that match characters in the
  // whitespace, identifier, and identifier-start categories. These
  // are only applied when a character is found to actually have a
  // code point above 128.
  // Generated by `bin/generate-identifier-regex.js`.
  var nonASCIIidentifierStartChars =
    "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u08a0-\u08b4\u08b6-\u08bd\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fef\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7bf\ua7c2-\ua7c6\ua7f7-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab67\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
  var nonASCIIidentifierChars =
    "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08d3-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1df9\u1dfb-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";

  var nonASCIIidentifierStart = new RegExp(
    "[" + nonASCIIidentifierStartChars + "]"
  );
  var nonASCIIidentifier = new RegExp(
    "[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]"
  );

  nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

  // These are a run-length and offset encoded representation of the
  // >0xffff code points that are a valid part of identifiers. The
  // offset starts at 0x10000, and each pair of numbers represents an
  // offset to the next range, and then a size of the range. They were
  // generated by bin/generate-identifier-regex.js

  // eslint-disable-next-line comma-spacing
  var astralIdentifierStartCodes = [
    0,
    11,
    2,
    25,
    2,
    18,
    2,
    1,
    2,
    14,
    3,
    13,
    35,
    122,
    70,
    52,
    268,
    28,
    4,
    48,
    48,
    31,
    14,
    29,
    6,
    37,
    11,
    29,
    3,
    35,
    5,
    7,
    2,
    4,
    43,
    157,
    19,
    35,
    5,
    35,
    5,
    39,
    9,
    51,
    157,
    310,
    10,
    21,
    11,
    7,
    153,
    5,
    3,
    0,
    2,
    43,
    2,
    1,
    4,
    0,
    3,
    22,
    11,
    22,
    10,
    30,
    66,
    18,
    2,
    1,
    11,
    21,
    11,
    25,
    71,
    55,
    7,
    1,
    65,
    0,
    16,
    3,
    2,
    2,
    2,
    28,
    43,
    28,
    4,
    28,
    36,
    7,
    2,
    27,
    28,
    53,
    11,
    21,
    11,
    18,
    14,
    17,
    111,
    72,
    56,
    50,
    14,
    50,
    14,
    35,
    477,
    28,
    11,
    0,
    9,
    21,
    155,
    22,
    13,
    52,
    76,
    44,
    33,
    24,
    27,
    35,
    30,
    0,
    12,
    34,
    4,
    0,
    13,
    47,
    15,
    3,
    22,
    0,
    2,
    0,
    36,
    17,
    2,
    24,
    85,
    6,
    2,
    0,
    2,
    3,
    2,
    14,
    2,
    9,
    8,
    46,
    39,
    7,
    3,
    1,
    3,
    21,
    2,
    6,
    2,
    1,
    2,
    4,
    4,
    0,
    19,
    0,
    13,
    4,
    159,
    52,
    19,
    3,
    21,
    0,
    33,
    47,
    21,
    1,
    2,
    0,
    185,
    46,
    42,
    3,
    37,
    47,
    21,
    0,
    60,
    42,
    14,
    0,
    72,
    26,
    230,
    43,
    117,
    63,
    32,
    0,
    161,
    7,
    3,
    38,
    17,
    0,
    2,
    0,
    29,
    0,
    11,
    39,
    8,
    0,
    22,
    0,
    12,
    45,
    20,
    0,
    35,
    56,
    264,
    8,
    2,
    36,
    18,
    0,
    50,
    29,
    113,
    6,
    2,
    1,
    2,
    37,
    22,
    0,
    26,
    5,
    2,
    1,
    2,
    31,
    15,
    0,
    328,
    18,
    270,
    921,
    103,
    110,
    18,
    195,
    2749,
    1070,
    4050,
    582,
    8634,
    568,
    8,
    30,
    114,
    29,
    19,
    47,
    17,
    3,
    32,
    20,
    6,
    18,
    689,
    63,
    129,
    74,
    6,
    0,
    67,
    12,
    65,
    1,
    2,
    0,
    29,
    6135,
    9,
    754,
    9486,
    286,
    50,
    2,
    18,
    3,
    9,
    395,
    2309,
    106,
    6,
    12,
    4,
    8,
    8,
    9,
    5991,
    84,
    2,
    70,
    2,
    1,
    3,
    0,
    3,
    1,
    3,
    3,
    2,
    11,
    2,
    0,
    2,
    6,
    2,
    64,
    2,
    3,
    3,
    7,
    2,
    6,
    2,
    27,
    2,
    3,
    2,
    4,
    2,
    0,
    4,
    6,
    2,
    339,
    3,
    24,
    2,
    24,
    2,
    30,
    2,
    24,
    2,
    30,
    2,
    24,
    2,
    30,
    2,
    24,
    2,
    30,
    2,
    24,
    2,
    7,
    2357,
    44,
    11,
    6,
    17,
    0,
    370,
    43,
    1301,
    196,
    60,
    67,
    8,
    0,
    1205,
    3,
    2,
    26,
    2,
    1,
    2,
    0,
    3,
    0,
    2,
    9,
    2,
    3,
    2,
    0,
    2,
    0,
    7,
    0,
    5,
    0,
    2,
    0,
    2,
    0,
    2,
    2,
    2,
    1,
    2,
    0,
    3,
    0,
    2,
    0,
    2,
    0,
    2,
    0,
    2,
    0,
    2,
    1,
    2,
    0,
    3,
    3,
    2,
    6,
    2,
    3,
    2,
    3,
    2,
    0,
    2,
    9,
    2,
    16,
    6,
    2,
    2,
    4,
    2,
    16,
    4421,
    42710,
    42,
    4148,
    12,
    221,
    3,
    5761,
    15,
    7472,
    3104,
    541,
  ];

  // eslint-disable-next-line comma-spacing
  var astralIdentifierCodes = [
    509,
    0,
    227,
    0,
    150,
    4,
    294,
    9,
    1368,
    2,
    2,
    1,
    6,
    3,
    41,
    2,
    5,
    0,
    166,
    1,
    574,
    3,
    9,
    9,
    525,
    10,
    176,
    2,
    54,
    14,
    32,
    9,
    16,
    3,
    46,
    10,
    54,
    9,
    7,
    2,
    37,
    13,
    2,
    9,
    6,
    1,
    45,
    0,
    13,
    2,
    49,
    13,
    9,
    3,
    4,
    9,
    83,
    11,
    7,
    0,
    161,
    11,
    6,
    9,
    7,
    3,
    56,
    1,
    2,
    6,
    3,
    1,
    3,
    2,
    10,
    0,
    11,
    1,
    3,
    6,
    4,
    4,
    193,
    17,
    10,
    9,
    5,
    0,
    82,
    19,
    13,
    9,
    214,
    6,
    3,
    8,
    28,
    1,
    83,
    16,
    16,
    9,
    82,
    12,
    9,
    9,
    84,
    14,
    5,
    9,
    243,
    14,
    166,
    9,
    232,
    6,
    3,
    6,
    4,
    0,
    29,
    9,
    41,
    6,
    2,
    3,
    9,
    0,
    10,
    10,
    47,
    15,
    406,
    7,
    2,
    7,
    17,
    9,
    57,
    21,
    2,
    13,
    123,
    5,
    4,
    0,
    2,
    1,
    2,
    6,
    2,
    0,
    9,
    9,
    49,
    4,
    2,
    1,
    2,
    4,
    9,
    9,
    330,
    3,
    19306,
    9,
    135,
    4,
    60,
    6,
    26,
    9,
    1014,
    0,
    2,
    54,
    8,
    3,
    19723,
    1,
    5319,
    4,
    4,
    5,
    9,
    7,
    3,
    6,
    31,
    3,
    149,
    2,
    1418,
    49,
    513,
    54,
    5,
    49,
    9,
    0,
    15,
    0,
    23,
    4,
    2,
    14,
    1361,
    6,
    2,
    16,
    3,
    6,
    2,
    1,
    2,
    4,
    262,
    6,
    10,
    9,
    419,
    13,
    1495,
    6,
    110,
    6,
    6,
    9,
    792487,
    239,
  ];

  // This has a complexity linear to the value of the code. The
  // assumption is that looking up astral identifier characters is
  // rare.
  function isInAstralSet(code, set) {
    var pos = 0x10000;
    for (var i = 0; i < set.length; i += 2) {
      pos += set[i];
      if (pos > code) {
        return false;
      }
      pos += set[i + 1];
      if (pos >= code) {
        return true;
      }
    }
  }

  // Test whether a given character code starts an identifier.

  function isIdentifierStart(code, astral) {
    if (code < 65) {
      return code === 36;
    }
    if (code < 91) {
      return true;
    }
    if (code < 97) {
      return code === 95;
    }
    if (code < 123) {
      return true;
    }
    if (code <= 0xffff) {
      return (
        code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code))
      );
    }
    if (astral === false) {
      return false;
    }
    return isInAstralSet(code, astralIdentifierStartCodes);
  }

  // Test whether a given character is part of an identifier.

  function isIdentifierChar(code, astral) {
    if (code < 48) {
      return code === 36;
    }
    if (code < 58) {
      return true;
    }
    if (code < 65) {
      return false;
    }
    if (code < 91) {
      return true;
    }
    if (code < 97) {
      return code === 95;
    }
    if (code < 123) {
      return true;
    }
    if (code <= 0xffff) {
      return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
    }
    if (astral === false) {
      return false;
    }
    return (
      isInAstralSet(code, astralIdentifierStartCodes) ||
      isInAstralSet(code, astralIdentifierCodes)
    );
  }

  // ## Token types

  // The assignment of fine-grained, information-carrying type objects
  // allows the tokenizer to store the information it has about a
  // token in a way that is very cheap for the parser to look up.

  // All token type variables start with an underscore, to make them
  // easy to recognize.

  // The `beforeExpr` property is used to disambiguate between regular
  // expressions and divisions. It is set on all token types that can
  // be followed by an expression (thus, a slash after them would be a
  // regular expression).
  //
  // The `startsExpr` property is used to check if the token ends a
  // `yield` expression. It is set on all token types that either can
  // directly start an expression (like a quotation mark) or can
  // continue an expression (like the body of a string).
  //
  // `isLoop` marks a keyword as starting a loop, which is important
  // to know when parsing a label, in order to allow or disallow
  // continue jumps to that label.

  var TokenType = function TokenType(label, conf) {
    if (conf === void 0) conf = {};

    this.label = label;
    this.keyword = conf.keyword;
    this.beforeExpr = !!conf.beforeExpr;
    this.startsExpr = !!conf.startsExpr;
    this.isLoop = !!conf.isLoop;
    this.isAssign = !!conf.isAssign;
    this.prefix = !!conf.prefix;
    this.postfix = !!conf.postfix;
    this.binop = conf.binop || null;
    this.updateContext = null;
  };

  function binop(name, prec) {
    return new TokenType(name, { beforeExpr: true, binop: prec });
  }
  var beforeExpr = { beforeExpr: true },
    startsExpr = { startsExpr: true };

  // Map keyword names to token types.

  var keywords$1 = {};

  // Succinct definitions of keyword token types
  function kw(name, options) {
    if (options === void 0) options = {};

    options.keyword = name;
    return (keywords$1[name] = new TokenType(name, options));
  }

  var types = {
    num: new TokenType("num", startsExpr),
    regexp: new TokenType("regexp", startsExpr),
    string: new TokenType("string", startsExpr),
    name: new TokenType("name", startsExpr),
    eof: new TokenType("eof"),

    // Punctuation token types.
    bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
    bracketR: new TokenType("]"),
    braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
    braceR: new TokenType("}"),
    parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
    parenR: new TokenType(")"),
    comma: new TokenType(",", beforeExpr),
    semi: new TokenType(";", beforeExpr),
    colon: new TokenType(":", beforeExpr),
    dot: new TokenType("."),
    question: new TokenType("?", beforeExpr),
    arrow: new TokenType("=>", beforeExpr),
    template: new TokenType("template"),
    invalidTemplate: new TokenType("invalidTemplate"),
    ellipsis: new TokenType("...", beforeExpr),
    backQuote: new TokenType("`", startsExpr),
    dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),

    // Operators. These carry several kinds of properties to help the
    // parser use them properly (the presence of these properties is
    // what categorizes them as operators).
    //
    // `binop`, when present, specifies that this operator is a binary
    // operator, and will refer to its precedence.
    //
    // `prefix` and `postfix` mark the operator as a prefix or postfix
    // unary operator.
    //
    // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
    // binary operators with a very low precedence, that should result
    // in AssignmentExpression nodes.

    eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
    assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
    incDec: new TokenType("++/--", {
      prefix: true,
      postfix: true,
      startsExpr: true,
    }),
    prefix: new TokenType("!/~", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true,
    }),
    logicalOR: binop("||", 1),
    logicalAND: binop("&&", 2),
    bitwiseOR: binop("|", 3),
    bitwiseXOR: binop("^", 4),
    bitwiseAND: binop("&", 5),
    equality: binop("==/!=/===/!==", 6),
    relational: binop("</>/<=/>=", 7),
    bitShift: binop("<</>>/>>>", 8),
    plusMin: new TokenType("+/-", {
      beforeExpr: true,
      binop: 9,
      prefix: true,
      startsExpr: true,
    }),
    modulo: binop("%", 10),
    star: binop("*", 10),
    slash: binop("/", 10),
    starstar: new TokenType("**", { beforeExpr: true }),

    // Keyword token types.
    _break: kw("break"),
    _case: kw("case", beforeExpr),
    _catch: kw("catch"),
    _continue: kw("continue"),
    _debugger: kw("debugger"),
    _default: kw("default", beforeExpr),
    _do: kw("do", { isLoop: true, beforeExpr: true }),
    _else: kw("else", beforeExpr),
    _finally: kw("finally"),
    _for: kw("for", { isLoop: true }),
    _function: kw("function", startsExpr),
    _if: kw("if"),
    _return: kw("return", beforeExpr),
    _switch: kw("switch"),
    _throw: kw("throw", beforeExpr),
    _try: kw("try"),
    _var: kw("var"),
    _const: kw("const"),
    _while: kw("while", { isLoop: true }),
    _with: kw("with"),
    _new: kw("new", { beforeExpr: true, startsExpr: true }),
    _this: kw("this", startsExpr),
    _super: kw("super", startsExpr),
    _class: kw("class", startsExpr),
    _extends: kw("extends", beforeExpr),
    _export: kw("export"),
    _import: kw("import", startsExpr),
    _null: kw("null", startsExpr),
    _true: kw("true", startsExpr),
    _false: kw("false", startsExpr),
    _in: kw("in", { beforeExpr: true, binop: 7 }),
    _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
    _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
    _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
    _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true }),
  };

  // Matches a whole line break (where CRLF is considered a single
  // line break). Used to count lines.

  var lineBreak = /\r\n?|\n|\u2028|\u2029/;
  var lineBreakG = new RegExp(lineBreak.source, "g");

  function isNewLine(code, ecma2019String) {
    return (
      code === 10 ||
      code === 13 ||
      (!ecma2019String && (code === 0x2028 || code === 0x2029))
    );
  }

  var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

  var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

  var ref = Object.prototype;
  var hasOwnProperty = ref.hasOwnProperty;
  var toString = ref.toString;

  // Checks if an object has a property.

  function has(obj, propName) {
    return hasOwnProperty.call(obj, propName);
  }

  var isArray =
    Array.isArray ||
    function(obj) {
      return toString.call(obj) === "[object Array]";
    };

  function wordsRegexp(words) {
    return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
  }

  // These are used when `options.locations` is on, for the
  // `startLoc` and `endLoc` properties.

  var Position = function Position(line, col) {
    this.line = line;
    this.column = col;
  };

  Position.prototype.offset = function offset(n) {
    return new Position(this.line, this.column + n);
  };

  var SourceLocation = function SourceLocation(p, start, end) {
    this.start = start;
    this.end = end;
    if (p.sourceFile !== null) {
      this.source = p.sourceFile;
    }
  };

  // The `getLineInfo` function is mostly useful when the
  // `locations` option is off (for performance reasons) and you
  // want to find the line/column position for a given character
  // offset. `input` should be the code string that the offset refers
  // into.

  function getLineInfo(input, offset) {
    for (var line = 1, cur = 0; ; ) {
      lineBreakG.lastIndex = cur;
      var match = lineBreakG.exec(input);
      if (match && match.index < offset) {
        ++line;
        cur = match.index + match[0].length;
      } else {
        return new Position(line, offset - cur);
      }
    }
  }

  // A second optional argument can be given to further configure
  // the parser process. These options are recognized:

  var defaultOptions = {
    // `ecmaVersion` indicates the ECMAScript version to parse. Must be
    // either 3, 5, 6 (2015), 7 (2016), 8 (2017), 9 (2018), or 10
    // (2019). This influences support for strict mode, the set of
    // reserved words, and support for new syntax features. The default
    // is 10.
    ecmaVersion: 10,
    // `sourceType` indicates the mode the code should be parsed in.
    // Can be either `"script"` or `"module"`. This influences global
    // strict mode and parsing of `import` and `export` declarations.
    sourceType: "script",
    // `onInsertedSemicolon` can be a callback that will be called
    // when a semicolon is automatically inserted. It will be passed
    // the position of the comma as an offset, and if `locations` is
    // enabled, it is given the location as a `{line, column}` object
    // as second argument.
    onInsertedSemicolon: null,
    // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
    // trailing commas.
    onTrailingComma: null,
    // By default, reserved words are only enforced if ecmaVersion >= 5.
    // Set `allowReserved` to a boolean value to explicitly turn this on
    // an off. When this option has the value "never", reserved words
    // and keywords can also not be used as property names.
    allowReserved: null,
    // When enabled, a return at the top level is not considered an
    // error.
    allowReturnOutsideFunction: false,
    // When enabled, import/export statements are not constrained to
    // appearing at the top of the program.
    allowImportExportEverywhere: false,
    // When enabled, await identifiers are allowed to appear at the top-level scope,
    // but they are still not allowed in non-async functions.
    allowAwaitOutsideFunction: false,
    // When enabled, hashbang directive in the beginning of file
    // is allowed and treated as a line comment.
    allowHashBang: false,
    // When `locations` is on, `loc` properties holding objects with
    // `start` and `end` properties in `{line, column}` form (with
    // line being 1-based and column 0-based) will be attached to the
    // nodes.
    locations: false,
    // A function can be passed as `onToken` option, which will
    // cause Acorn to call that function with object in the same
    // format as tokens returned from `tokenizer().getToken()`. Note
    // that you are not allowed to call the parser from the
    // callback—that will corrupt its internal state.
    onToken: null,
    // A function can be passed as `onComment` option, which will
    // cause Acorn to call that function with `(block, text, start,
    // end)` parameters whenever a comment is skipped. `block` is a
    // boolean indicating whether this is a block (`/* */`) comment,
    // `text` is the content of the comment, and `start` and `end` are
    // character offsets that denote the start and end of the comment.
    // When the `locations` option is on, two more parameters are
    // passed, the full `{line, column}` locations of the start and
    // end of the comments. Note that you are not allowed to call the
    // parser from the callback—that will corrupt its internal state.
    onComment: null,
    // Nodes have their start and end characters offsets recorded in
    // `start` and `end` properties (directly on the node, rather than
    // the `loc` object, which holds line/column data. To also add a
    // [semi-standardized][range] `range` property holding a `[start,
    // end]` array with the same numbers, set the `ranges` option to
    // `true`.
    //
    // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
    ranges: false,
    // It is possible to parse multiple files into a single AST by
    // passing the tree produced by parsing the first file as
    // `program` option in subsequent parses. This will add the
    // toplevel forms of the parsed file to the `Program` (top) node
    // of an existing parse tree.
    program: null,
    // When `locations` is on, you can pass this to record the source
    // file in every node's `loc` object.
    sourceFile: null,
    // This value, if given, is stored in every node, whether
    // `locations` is on or off.
    directSourceFile: null,
    // When enabled, parenthesized expressions are represented by
    // (non-standard) ParenthesizedExpression nodes
    preserveParens: false,
  };

  // Interpret and default an options object

  function getOptions(opts) {
    var options = {};

    for (var opt in defaultOptions) {
      options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];
    }

    if (options.ecmaVersion >= 2015) {
      options.ecmaVersion -= 2009;
    }

    if (options.allowReserved == null) {
      options.allowReserved = options.ecmaVersion < 5;
    }

    if (isArray(options.onToken)) {
      var tokens = options.onToken;
      options.onToken = function(token) {
        return tokens.push(token);
      };
    }
    if (isArray(options.onComment)) {
      options.onComment = pushComment(options, options.onComment);
    }

    return options;
  }

  function pushComment(options, array) {
    return function(block, text, start, end, startLoc, endLoc) {
      var comment = {
        type: block ? "Block" : "Line",
        value: text,
        start: start,
        end: end,
      };
      if (options.locations) {
        comment.loc = new SourceLocation(this, startLoc, endLoc);
      }
      if (options.ranges) {
        comment.range = [start, end];
      }
      array.push(comment);
    };
  }

  // Each scope gets a bitset that may contain these flags
  var SCOPE_TOP = 1,
    SCOPE_FUNCTION = 2,
    SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION,
    SCOPE_ASYNC = 4,
    SCOPE_GENERATOR = 8,
    SCOPE_ARROW = 16,
    SCOPE_SIMPLE_CATCH = 32,
    SCOPE_SUPER = 64,
    SCOPE_DIRECT_SUPER = 128;

  function functionFlags(async, generator) {
    return (
      SCOPE_FUNCTION |
      (async ? SCOPE_ASYNC : 0) |
      (generator ? SCOPE_GENERATOR : 0)
    );
  }

  // Used in checkLVal and declareName to determine the type of a binding
  var BIND_NONE = 0, // Not a binding
    BIND_VAR = 1, // Var-style binding
    BIND_LEXICAL = 2, // Let- or const-style binding
    BIND_FUNCTION = 3, // Function declaration
    BIND_SIMPLE_CATCH = 4, // Simple (identifier pattern) catch binding
    BIND_OUTSIDE = 5; // Special case for function names as bound inside the function

  var Parser = function Parser(options, input, startPos) {
    this.options = options = getOptions(options);
    this.sourceFile = options.sourceFile;
    this.keywords = wordsRegexp(
      keywords[
        options.ecmaVersion >= 6
          ? 6
          : options.sourceType === "module"
          ? "5module"
          : 5
      ]
    );
    var reserved = "";
    if (options.allowReserved !== true) {
      for (var v = options.ecmaVersion; ; v--) {
        if ((reserved = reservedWords[v])) {
          break;
        }
      }
      if (options.sourceType === "module") {
        reserved += " await";
      }
    }
    this.reservedWords = wordsRegexp(reserved);
    var reservedStrict =
      (reserved ? reserved + " " : "") + reservedWords.strict;
    this.reservedWordsStrict = wordsRegexp(reservedStrict);
    this.reservedWordsStrictBind = wordsRegexp(
      reservedStrict + " " + reservedWords.strictBind
    );
    this.input = String(input);

    // Used to signal to callers of `readWord1` whether the word
    // contained any escape sequences. This is needed because words with
    // escape sequences must not be interpreted as keywords.
    this.containsEsc = false;

    // Set up token state

    // The current position of the tokenizer in the input.
    if (startPos) {
      this.pos = startPos;
      this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
      this.curLine = this.input
        .slice(0, this.lineStart)
        .split(lineBreak).length;
    } else {
      this.pos = this.lineStart = 0;
      this.curLine = 1;
    }

    // Properties of the current token:
    // Its type
    this.type = types.eof;
    // For tokens that include more information than their type, the value
    this.value = null;
    // Its start and end offset
    this.start = this.end = this.pos;
    // And, if locations are used, the {line, column} object
    // corresponding to those offsets
    this.startLoc = this.endLoc = this.curPosition();

    // Position information for the previous token
    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;

    // The context stack is used to superficially track syntactic
    // context to predict whether a regular expression is allowed in a
    // given position.
    this.context = this.initialContext();
    this.exprAllowed = true;

    // Figure out if it's a module code.
    this.inModule = options.sourceType === "module";
    this.strict = this.inModule || this.strictDirective(this.pos);

    // Used to signify the start of a potential arrow function
    this.potentialArrowAt = -1;

    // Positions to delayed-check that yield/await does not exist in default parameters.
    this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
    // Labels in scope.
    this.labels = [];
    // Thus-far undefined exports.
    this.undefinedExports = {};

    // If enabled, skip leading hashbang line.
    if (
      this.pos === 0 &&
      options.allowHashBang &&
      this.input.slice(0, 2) === "#!"
    ) {
      this.skipLineComment(2);
    }

    // Scope tracking for duplicate variable names (see scope.js)
    this.scopeStack = [];
    this.enterScope(SCOPE_TOP);

    // For RegExp validation
    this.regexpState = null;
  };

  var prototypeAccessors = {
    inFunction: { configurable: true },
    inGenerator: { configurable: true },
    inAsync: { configurable: true },
    allowSuper: { configurable: true },
    allowDirectSuper: { configurable: true },
    treatFunctionsAsVar: { configurable: true },
  };

  Parser.prototype.parse = function parse() {
    var node = this.options.program || this.startNode();
    this.nextToken();
    return this.parseTopLevel(node);
  };

  prototypeAccessors.inFunction.get = function() {
    return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
  };
  prototypeAccessors.inGenerator.get = function() {
    return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0;
  };
  prototypeAccessors.inAsync.get = function() {
    return (this.currentVarScope().flags & SCOPE_ASYNC) > 0;
  };
  prototypeAccessors.allowSuper.get = function() {
    return (this.currentThisScope().flags & SCOPE_SUPER) > 0;
  };
  prototypeAccessors.allowDirectSuper.get = function() {
    return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
  };
  prototypeAccessors.treatFunctionsAsVar.get = function() {
    return this.treatFunctionsAsVarInScope(this.currentScope());
  };

  // Switch to a getter for 7.0.0.
  Parser.prototype.inNonArrowFunction = function inNonArrowFunction() {
    return (this.currentThisScope().flags & SCOPE_FUNCTION) > 0;
  };

  Parser.extend = function extend() {
    var plugins = [],
      len = arguments.length;
    while (len--) plugins[len] = arguments[len];

    var cls = this;
    for (var i = 0; i < plugins.length; i++) {
      cls = plugins[i](cls);
    }
    return cls;
  };

  Parser.parse = function parse(input, options) {
    return new this(options, input).parse();
  };

  Parser.parseExpressionAt = function parseExpressionAt(input, pos, options) {
    var parser = new this(options, input, pos);
    parser.nextToken();
    return parser.parseExpression();
  };

  Parser.tokenizer = function tokenizer(input, options) {
    return new this(options, input);
  };

  Object.defineProperties(Parser.prototype, prototypeAccessors);

  var pp = Parser.prototype;

  // ## Parser utilities

  var literal = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/;
  pp.strictDirective = function(start) {
    for (;;) {
      // Try to find string literal.
      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;
      var match = literal.exec(this.input.slice(start));
      if (!match) {
        return false;
      }
      if ((match[1] || match[2]) === "use strict") {
        return true;
      }
      start += match[0].length;

      // Skip semicolon, if any.
      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;
      if (this.input[start] === ";") {
        start++;
      }
    }
  };

  // Predicate that tests whether the next token is of the given
  // type, and if yes, consumes it as a side effect.

  pp.eat = function(type) {
    if (this.type === type) {
      this.next();
      return true;
    } else {
      return false;
    }
  };

  // Tests whether parsed token is a contextual keyword.

  pp.isContextual = function(name) {
    return this.type === types.name && this.value === name && !this.containsEsc;
  };

  // Consumes contextual keyword if possible.

  pp.eatContextual = function(name) {
    if (!this.isContextual(name)) {
      return false;
    }
    this.next();
    return true;
  };

  // Asserts that following token is given contextual keyword.

  pp.expectContextual = function(name) {
    if (!this.eatContextual(name)) {
      this.unexpected();
    }
  };

  // Test whether a semicolon can be inserted at the current position.

  pp.canInsertSemicolon = function() {
    return (
      this.type === types.eof ||
      this.type === types.braceR ||
      lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
    );
  };

  pp.insertSemicolon = function() {
    if (this.canInsertSemicolon()) {
      if (this.options.onInsertedSemicolon) {
        this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
      }
      return true;
    }
  };

  // Consume a semicolon, or, failing that, see if we are allowed to
  // pretend that there is a semicolon at this position.

  pp.semicolon = function() {
    if (!this.eat(types.semi) && !this.insertSemicolon()) {
      this.unexpected();
    }
  };

  pp.afterTrailingComma = function(tokType, notNext) {
    if (this.type === tokType) {
      if (this.options.onTrailingComma) {
        this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
      }
      if (!notNext) {
        this.next();
      }
      return true;
    }
  };

  // Expect a token of a given type. If found, consume it, otherwise,
  // raise an unexpected token error.

  pp.expect = function(type) {
    this.eat(type) || this.unexpected();
  };

  // Raise an unexpected token error.

  pp.unexpected = function(pos) {
    this.raise(pos != null ? pos : this.start, "Unexpected token");
  };

  function DestructuringErrors() {
    this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
  }

  pp.checkPatternErrors = function(refDestructuringErrors, isAssign) {
    if (!refDestructuringErrors) {
      return;
    }
    if (refDestructuringErrors.trailingComma > -1) {
      this.raiseRecoverable(
        refDestructuringErrors.trailingComma,
        "Comma is not permitted after the rest element"
      );
    }
    var parens = isAssign
      ? refDestructuringErrors.parenthesizedAssign
      : refDestructuringErrors.parenthesizedBind;
    if (parens > -1) {
      this.raiseRecoverable(parens, "Parenthesized pattern");
    }
  };

  pp.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
    if (!refDestructuringErrors) {
      return false;
    }
    var shorthandAssign = refDestructuringErrors.shorthandAssign;
    var doubleProto = refDestructuringErrors.doubleProto;
    if (!andThrow) {
      return shorthandAssign >= 0 || doubleProto >= 0;
    }
    if (shorthandAssign >= 0) {
      this.raise(
        shorthandAssign,
        "Shorthand property assignments are valid only in destructuring patterns"
      );
    }
    if (doubleProto >= 0) {
      this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
    }
  };

  pp.checkYieldAwaitInDefaultParams = function() {
    if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
      this.raise(this.yieldPos, "Yield expression cannot be a default value");
    }
    if (this.awaitPos) {
      this.raise(this.awaitPos, "Await expression cannot be a default value");
    }
  };

  pp.isSimpleAssignTarget = function(expr) {
    if (expr.type === "ParenthesizedExpression") {
      return this.isSimpleAssignTarget(expr.expression);
    }
    return expr.type === "Identifier" || expr.type === "MemberExpression";
  };

  var pp$1 = Parser.prototype;

  // ### Statement parsing

  // Parse a program. Initializes the parser, reads any number of
  // statements, and wraps them in a Program node.  Optionally takes a
  // `program` argument.  If present, the statements will be appended
  // to its body instead of creating a new node.

  pp$1.parseTopLevel = function(node) {
    var exports = {};
    if (!node.body) {
      node.body = [];
    }
    while (this.type !== types.eof) {
      var stmt = this.parseStatement(null, true, exports);
      node.body.push(stmt);
    }
    if (this.inModule) {
      for (
        var i = 0, list = Object.keys(this.undefinedExports);
        i < list.length;
        i += 1
      ) {
        var name = list[i];

        this.raiseRecoverable(
          this.undefinedExports[name].start,
          "Export '" + name + "' is not defined"
        );
      }
    }
    this.adaptDirectivePrologue(node.body);
    this.next();
    node.sourceType = this.options.sourceType;
    return this.finishNode(node, "Program");
  };

  var loopLabel = { kind: "loop" },
    switchLabel = { kind: "switch" };

  pp$1.isLet = function(context) {
    if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
      return false;
    }
    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length,
      nextCh = this.input.charCodeAt(next);
    // For ambiguous cases, determine if a LexicalDeclaration (or only a
    // Statement) is allowed here. If context is not empty then only a Statement
    // is allowed. However, `let [` is an explicit negative lookahead for
    // ExpressionStatement, so special-case it first.
    if (nextCh === 91) {
      return true;
    } // '['
    if (context) {
      return false;
    }

    if (nextCh === 123) {
      return true;
    } // '{'
    if (isIdentifierStart(nextCh, true)) {
      var pos = next + 1;
      while (isIdentifierChar(this.input.charCodeAt(pos), true)) {
        ++pos;
      }
      var ident = this.input.slice(next, pos);
      if (!keywordRelationalOperator.test(ident)) {
        return true;
      }
    }
    return false;
  };

  // check 'async [no LineTerminator here] function'
  // - 'async /*foo*/ function' is OK.
  // - 'async /*\n*/ function' is invalid.
  pp$1.isAsyncFunction = function() {
    if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
      return false;
    }

    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length;
    return (
      !lineBreak.test(this.input.slice(this.pos, next)) &&
      this.input.slice(next, next + 8) === "function" &&
      (next + 8 === this.input.length ||
        !isIdentifierChar(this.input.charAt(next + 8)))
    );
  };

  // Parse a single statement.
  //
  // If expecting a statement and finding a slash operator, parse a
  // regular expression literal. This is to handle cases like
  // `if (foo) /blah/.exec(foo)`, where looking at the previous token
  // does not help.

  pp$1.parseStatement = function(context, topLevel, exports) {
    var starttype = this.type,
      node = this.startNode(),
      kind;

    if (this.isLet(context)) {
      starttype = types._var;
      kind = "let";
    }

    // Most types of statements are recognized by the keyword they
    // start with. Many are trivial to parse, some require a bit of
    // complexity.

    switch (starttype) {
      case types._break:
      case types._continue:
        return this.parseBreakContinueStatement(node, starttype.keyword);
      case types._debugger:
        return this.parseDebuggerStatement(node);
      case types._do:
        return this.parseDoStatement(node);
      case types._for:
        return this.parseForStatement(node);
      case types._function:
        // Function as sole body of either an if statement or a labeled statement
        // works, but not when it is part of a labeled statement that is the sole
        // body of an if statement.
        if (
          context &&
          (this.strict || (context !== "if" && context !== "label")) &&
          this.options.ecmaVersion >= 6
        ) {
          this.unexpected();
        }
        return this.parseFunctionStatement(node, false, !context);
      case types._class:
        if (context) {
          this.unexpected();
        }
        return this.parseClass(node, true);
      case types._if:
        return this.parseIfStatement(node);
      case types._return:
        return this.parseReturnStatement(node);
      case types._switch:
        return this.parseSwitchStatement(node);
      case types._throw:
        return this.parseThrowStatement(node);
      case types._try:
        return this.parseTryStatement(node);
      case types._const:
      case types._var:
        kind = kind || this.value;
        if (context && kind !== "var") {
          this.unexpected();
        }
        return this.parseVarStatement(node, kind);
      case types._while:
        return this.parseWhileStatement(node);
      case types._with:
        return this.parseWithStatement(node);
      case types.braceL:
        return this.parseBlock(true, node);
      case types.semi:
        return this.parseEmptyStatement(node);
      case types._export:
      case types._import:
        if (this.options.ecmaVersion > 10 && starttype === types._import) {
          skipWhiteSpace.lastIndex = this.pos;
          var skip = skipWhiteSpace.exec(this.input);
          var next = this.pos + skip[0].length,
            nextCh = this.input.charCodeAt(next);
          if (nextCh === 40) {
            // '('
            return this.parseExpressionStatement(node, this.parseExpression());
          }
        }

        if (!this.options.allowImportExportEverywhere) {
          if (!topLevel) {
            this.raise(
              this.start,
              "'import' and 'export' may only appear at the top level"
            );
          }
          if (!this.inModule) {
            this.raise(
              this.start,
              "'import' and 'export' may appear only with 'sourceType: module'"
            );
          }
        }
        return starttype === types._import
          ? this.parseImport(node)
          : this.parseExport(node, exports);

      // If the statement does not start with a statement keyword or a
      // brace, it's an ExpressionStatement or LabeledStatement. We
      // simply start parsing an expression, and afterwards, if the
      // next token is a colon and the expression was a simple
      // Identifier node, we switch to interpreting it as a label.
      default:
        if (this.isAsyncFunction()) {
          if (context) {
            this.unexpected();
          }
          this.next();
          return this.parseFunctionStatement(node, true, !context);
        }

        var maybeName = this.value,
          expr = this.parseExpression();
        if (
          starttype === types.name &&
          expr.type === "Identifier" &&
          this.eat(types.colon)
        ) {
          return this.parseLabeledStatement(node, maybeName, expr, context);
        } else {
          return this.parseExpressionStatement(node, expr);
        }
    }
  };

  pp$1.parseBreakContinueStatement = function(node, keyword) {
    var isBreak = keyword === "break";
    this.next();
    if (this.eat(types.semi) || this.insertSemicolon()) {
      node.label = null;
    } else if (this.type !== types.name) {
      this.unexpected();
    } else {
      node.label = this.parseIdent();
      this.semicolon();
    }

    // Verify that there is an actual destination to break or
    // continue to.
    var i = 0;
    for (; i < this.labels.length; ++i) {
      var lab = this.labels[i];
      if (node.label == null || lab.name === node.label.name) {
        if (lab.kind != null && (isBreak || lab.kind === "loop")) {
          break;
        }
        if (node.label && isBreak) {
          break;
        }
      }
    }
    if (i === this.labels.length) {
      this.raise(node.start, "Unsyntactic " + keyword);
    }
    return this.finishNode(
      node,
      isBreak ? "BreakStatement" : "ContinueStatement"
    );
  };

  pp$1.parseDebuggerStatement = function(node) {
    this.next();
    this.semicolon();
    return this.finishNode(node, "DebuggerStatement");
  };

  pp$1.parseDoStatement = function(node) {
    this.next();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("do");
    this.labels.pop();
    this.expect(types._while);
    node.test = this.parseParenExpression();
    if (this.options.ecmaVersion >= 6) {
      this.eat(types.semi);
    } else {
      this.semicolon();
    }
    return this.finishNode(node, "DoWhileStatement");
  };

  // Disambiguating between a `for` and a `for`/`in` or `for`/`of`
  // loop is non-trivial. Basically, we have to parse the init `var`
  // statement or expression, disallowing the `in` operator (see
  // the second parameter to `parseExpression`), and then check
  // whether the next token is `in` or `of`. When there is no init
  // part (semicolon immediately after the opening parenthesis), it
  // is a regular `for` loop.

  pp$1.parseForStatement = function(node) {
    this.next();
    var awaitAt =
      this.options.ecmaVersion >= 9 &&
      (this.inAsync ||
        (!this.inFunction && this.options.allowAwaitOutsideFunction)) &&
      this.eatContextual("await")
        ? this.lastTokStart
        : -1;
    this.labels.push(loopLabel);
    this.enterScope(0);
    this.expect(types.parenL);
    if (this.type === types.semi) {
      if (awaitAt > -1) {
        this.unexpected(awaitAt);
      }
      return this.parseFor(node, null);
    }
    var isLet = this.isLet();
    if (this.type === types._var || this.type === types._const || isLet) {
      var init$1 = this.startNode(),
        kind = isLet ? "let" : this.value;
      this.next();
      this.parseVar(init$1, true, kind);
      this.finishNode(init$1, "VariableDeclaration");
      if (
        (this.type === types._in ||
          (this.options.ecmaVersion >= 6 && this.isContextual("of"))) &&
        init$1.declarations.length === 1
      ) {
        if (this.options.ecmaVersion >= 9) {
          if (this.type === types._in) {
            if (awaitAt > -1) {
              this.unexpected(awaitAt);
            }
          } else {
            node.await = awaitAt > -1;
          }
        }
        return this.parseForIn(node, init$1);
      }
      if (awaitAt > -1) {
        this.unexpected(awaitAt);
      }
      return this.parseFor(node, init$1);
    }
    var refDestructuringErrors = new DestructuringErrors();
    var init = this.parseExpression(true, refDestructuringErrors);
    if (
      this.type === types._in ||
      (this.options.ecmaVersion >= 6 && this.isContextual("of"))
    ) {
      if (this.options.ecmaVersion >= 9) {
        if (this.type === types._in) {
          if (awaitAt > -1) {
            this.unexpected(awaitAt);
          }
        } else {
          node.await = awaitAt > -1;
        }
      }
      this.toAssignable(init, false, refDestructuringErrors);
      this.checkLVal(init);
      return this.parseForIn(node, init);
    } else {
      this.checkExpressionErrors(refDestructuringErrors, true);
    }
    if (awaitAt > -1) {
      this.unexpected(awaitAt);
    }
    return this.parseFor(node, init);
  };

  pp$1.parseFunctionStatement = function(node, isAsync, declarationPosition) {
    this.next();
    return this.parseFunction(
      node,
      FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT),
      false,
      isAsync
    );
  };

  pp$1.parseIfStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    // allow function declarations in branches, but only in non-strict mode
    node.consequent = this.parseStatement("if");
    node.alternate = this.eat(types._else) ? this.parseStatement("if") : null;
    return this.finishNode(node, "IfStatement");
  };

  pp$1.parseReturnStatement = function(node) {
    if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
      this.raise(this.start, "'return' outside of function");
    }
    this.next();

    // In `return` (and `break`/`continue`), the keywords with
    // optional arguments, we eagerly look for a semicolon or the
    // possibility to insert one.

    if (this.eat(types.semi) || this.insertSemicolon()) {
      node.argument = null;
    } else {
      node.argument = this.parseExpression();
      this.semicolon();
    }
    return this.finishNode(node, "ReturnStatement");
  };

  pp$1.parseSwitchStatement = function(node) {
    this.next();
    node.discriminant = this.parseParenExpression();
    node.cases = [];
    this.expect(types.braceL);
    this.labels.push(switchLabel);
    this.enterScope(0);

    // Statements under must be grouped (by label) in SwitchCase
    // nodes. `cur` is used to keep the node that we are currently
    // adding statements to.

    var cur;
    for (var sawDefault = false; this.type !== types.braceR; ) {
      if (this.type === types._case || this.type === types._default) {
        var isCase = this.type === types._case;
        if (cur) {
          this.finishNode(cur, "SwitchCase");
        }
        node.cases.push((cur = this.startNode()));
        cur.consequent = [];
        this.next();
        if (isCase) {
          cur.test = this.parseExpression();
        } else {
          if (sawDefault) {
            this.raiseRecoverable(
              this.lastTokStart,
              "Multiple default clauses"
            );
          }
          sawDefault = true;
          cur.test = null;
        }
        this.expect(types.colon);
      } else {
        if (!cur) {
          this.unexpected();
        }
        cur.consequent.push(this.parseStatement(null));
      }
    }
    this.exitScope();
    if (cur) {
      this.finishNode(cur, "SwitchCase");
    }
    this.next(); // Closing brace
    this.labels.pop();
    return this.finishNode(node, "SwitchStatement");
  };

  pp$1.parseThrowStatement = function(node) {
    this.next();
    if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
      this.raise(this.lastTokEnd, "Illegal newline after throw");
    }
    node.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(node, "ThrowStatement");
  };

  // Reused empty array added for node fields that are always empty.

  var empty = [];

  pp$1.parseTryStatement = function(node) {
    this.next();
    node.block = this.parseBlock();
    node.handler = null;
    if (this.type === types._catch) {
      var clause = this.startNode();
      this.next();
      if (this.eat(types.parenL)) {
        clause.param = this.parseBindingAtom();
        var simple = clause.param.type === "Identifier";
        this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
        this.checkLVal(clause.param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
        this.expect(types.parenR);
      } else {
        if (this.options.ecmaVersion < 10) {
          this.unexpected();
        }
        clause.param = null;
        this.enterScope(0);
      }
      clause.body = this.parseBlock(false);
      this.exitScope();
      node.handler = this.finishNode(clause, "CatchClause");
    }
    node.finalizer = this.eat(types._finally) ? this.parseBlock() : null;
    if (!node.handler && !node.finalizer) {
      this.raise(node.start, "Missing catch or finally clause");
    }
    return this.finishNode(node, "TryStatement");
  };

  pp$1.parseVarStatement = function(node, kind) {
    this.next();
    this.parseVar(node, false, kind);
    this.semicolon();
    return this.finishNode(node, "VariableDeclaration");
  };

  pp$1.parseWhileStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("while");
    this.labels.pop();
    return this.finishNode(node, "WhileStatement");
  };

  pp$1.parseWithStatement = function(node) {
    if (this.strict) {
      this.raise(this.start, "'with' in strict mode");
    }
    this.next();
    node.object = this.parseParenExpression();
    node.body = this.parseStatement("with");
    return this.finishNode(node, "WithStatement");
  };

  pp$1.parseEmptyStatement = function(node) {
    this.next();
    return this.finishNode(node, "EmptyStatement");
  };

  pp$1.parseLabeledStatement = function(node, maybeName, expr, context) {
    for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1) {
      var label = list[i$1];

      if (label.name === maybeName) {
        this.raise(expr.start, "Label '" + maybeName + "' is already declared");
      }
    }
    var kind = this.type.isLoop
      ? "loop"
      : this.type === types._switch
      ? "switch"
      : null;
    for (var i = this.labels.length - 1; i >= 0; i--) {
      var label$1 = this.labels[i];
      if (label$1.statementStart === node.start) {
        // Update information about previous labels on this node
        label$1.statementStart = this.start;
        label$1.kind = kind;
      } else {
        break;
      }
    }
    this.labels.push({
      name: maybeName,
      kind: kind,
      statementStart: this.start,
    });
    node.body = this.parseStatement(
      context
        ? context.indexOf("label") === -1
          ? context + "label"
          : context
        : "label"
    );
    this.labels.pop();
    node.label = expr;
    return this.finishNode(node, "LabeledStatement");
  };

  pp$1.parseExpressionStatement = function(node, expr) {
    node.expression = expr;
    this.semicolon();
    return this.finishNode(node, "ExpressionStatement");
  };

  // Parse a semicolon-enclosed block of statements, handling `"use
  // strict"` declarations when `allowStrict` is true (used for
  // function bodies).

  pp$1.parseBlock = function(createNewLexicalScope, node) {
    if (createNewLexicalScope === void 0) createNewLexicalScope = true;
    if (node === void 0) node = this.startNode();

    node.body = [];
    this.expect(types.braceL);
    if (createNewLexicalScope) {
      this.enterScope(0);
    }
    while (!this.eat(types.braceR)) {
      var stmt = this.parseStatement(null);
      node.body.push(stmt);
    }
    if (createNewLexicalScope) {
      this.exitScope();
    }
    return this.finishNode(node, "BlockStatement");
  };

  // Parse a regular `for` loop. The disambiguation code in
  // `parseStatement` will already have parsed the init statement or
  // expression.

  pp$1.parseFor = function(node, init) {
    node.init = init;
    this.expect(types.semi);
    node.test = this.type === types.semi ? null : this.parseExpression();
    this.expect(types.semi);
    node.update = this.type === types.parenR ? null : this.parseExpression();
    this.expect(types.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, "ForStatement");
  };

  // Parse a `for`/`in` and `for`/`of` loop, which are almost
  // same from parser's perspective.

  pp$1.parseForIn = function(node, init) {
    var isForIn = this.type === types._in;
    this.next();

    if (
      init.type === "VariableDeclaration" &&
      init.declarations[0].init != null &&
      (!isForIn ||
        this.options.ecmaVersion < 8 ||
        this.strict ||
        init.kind !== "var" ||
        init.declarations[0].id.type !== "Identifier")
    ) {
      this.raise(
        init.start,
        (isForIn ? "for-in" : "for-of") +
          " loop variable declaration may not have an initializer"
      );
    } else if (init.type === "AssignmentPattern") {
      this.raise(init.start, "Invalid left-hand side in for-loop");
    }
    node.left = init;
    node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
    this.expect(types.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
  };

  // Parse a list of variable declarations.

  pp$1.parseVar = function(node, isFor, kind) {
    node.declarations = [];
    node.kind = kind;
    for (;;) {
      var decl = this.startNode();
      this.parseVarId(decl, kind);
      if (this.eat(types.eq)) {
        decl.init = this.parseMaybeAssign(isFor);
      } else if (
        kind === "const" &&
        !(
          this.type === types._in ||
          (this.options.ecmaVersion >= 6 && this.isContextual("of"))
        )
      ) {
        this.unexpected();
      } else if (
        decl.id.type !== "Identifier" &&
        !(isFor && (this.type === types._in || this.isContextual("of")))
      ) {
        this.raise(
          this.lastTokEnd,
          "Complex binding patterns require an initialization value"
        );
      } else {
        decl.init = null;
      }
      node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
      if (!this.eat(types.comma)) {
        break;
      }
    }
    return node;
  };

  pp$1.parseVarId = function(decl, kind) {
    decl.id = this.parseBindingAtom();
    this.checkLVal(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
  };

  var FUNC_STATEMENT = 1,
    FUNC_HANGING_STATEMENT = 2,
    FUNC_NULLABLE_ID = 4;

  // Parse a function declaration or literal (depending on the
  // `statement & FUNC_STATEMENT`).

  // Remove `allowExpressionBody` for 7.0.0, as it is only called with false
  pp$1.parseFunction = function(node, statement, allowExpressionBody, isAsync) {
    this.initFunction(node);
    if (
      this.options.ecmaVersion >= 9 ||
      (this.options.ecmaVersion >= 6 && !isAsync)
    ) {
      if (this.type === types.star && statement & FUNC_HANGING_STATEMENT) {
        this.unexpected();
      }
      node.generator = this.eat(types.star);
    }
    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }

    if (statement & FUNC_STATEMENT) {
      node.id =
        statement & FUNC_NULLABLE_ID && this.type !== types.name
          ? null
          : this.parseIdent();
      if (node.id && !(statement & FUNC_HANGING_STATEMENT)) {
        // If it is a regular function declaration in sloppy mode, then it is
        // subject to Annex B semantics (BIND_FUNCTION). Otherwise, the binding
        // mode depends on properties of the current scope (see
        // treatFunctionsAsVar).
        this.checkLVal(
          node.id,
          this.strict || node.generator || node.async
            ? this.treatFunctionsAsVar
              ? BIND_VAR
              : BIND_LEXICAL
            : BIND_FUNCTION
        );
      }
    }

    var oldYieldPos = this.yieldPos,
      oldAwaitPos = this.awaitPos,
      oldAwaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(functionFlags(node.async, node.generator));

    if (!(statement & FUNC_STATEMENT)) {
      node.id = this.type === types.name ? this.parseIdent() : null;
    }

    this.parseFunctionParams(node);
    this.parseFunctionBody(node, allowExpressionBody, false);

    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(
      node,
      statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression"
    );
  };

  pp$1.parseFunctionParams = function(node) {
    this.expect(types.parenL);
    node.params = this.parseBindingList(
      types.parenR,
      false,
      this.options.ecmaVersion >= 8
    );
    this.checkYieldAwaitInDefaultParams();
  };

  // Parse a class declaration or literal (depending on the
  // `isStatement` parameter).

  pp$1.parseClass = function(node, isStatement) {
    this.next();

    // ecma-262 14.6 Class Definitions
    // A class definition is always strict mode code.
    var oldStrict = this.strict;
    this.strict = true;

    this.parseClassId(node, isStatement);
    this.parseClassSuper(node);
    var classBody = this.startNode();
    var hadConstructor = false;
    classBody.body = [];
    this.expect(types.braceL);
    while (!this.eat(types.braceR)) {
      var element = this.parseClassElement(node.superClass !== null);
      if (element) {
        classBody.body.push(element);
        if (
          element.type === "MethodDefinition" &&
          element.kind === "constructor"
        ) {
          if (hadConstructor) {
            this.raise(
              element.start,
              "Duplicate constructor in the same class"
            );
          }
          hadConstructor = true;
        }
      }
    }
    node.body = this.finishNode(classBody, "ClassBody");
    this.strict = oldStrict;
    return this.finishNode(
      node,
      isStatement ? "ClassDeclaration" : "ClassExpression"
    );
  };

  pp$1.parseClassElement = function(constructorAllowsSuper) {
    var this$1 = this;

    if (this.eat(types.semi)) {
      return null;
    }

    var method = this.startNode();
    var tryContextual = function(k, noLineBreak) {
      if (noLineBreak === void 0) noLineBreak = false;

      var start = this$1.start,
        startLoc = this$1.startLoc;
      if (!this$1.eatContextual(k)) {
        return false;
      }
      if (
        this$1.type !== types.parenL &&
        (!noLineBreak || !this$1.canInsertSemicolon())
      ) {
        return true;
      }
      if (method.key) {
        this$1.unexpected();
      }
      method.computed = false;
      method.key = this$1.startNodeAt(start, startLoc);
      method.key.name = k;
      this$1.finishNode(method.key, "Identifier");
      return false;
    };

    method.kind = "method";
    method.static = tryContextual("static");
    var isGenerator = this.eat(types.star);
    var isAsync = false;
    if (!isGenerator) {
      if (this.options.ecmaVersion >= 8 && tryContextual("async", true)) {
        isAsync = true;
        isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
      } else if (tryContextual("get")) {
        method.kind = "get";
      } else if (tryContextual("set")) {
        method.kind = "set";
      }
    }
    if (!method.key) {
      this.parsePropertyName(method);
    }
    var key = method.key;
    var allowsDirectSuper = false;
    if (
      !method.computed &&
      !method.static &&
      ((key.type === "Identifier" && key.name === "constructor") ||
        (key.type === "Literal" && key.value === "constructor"))
    ) {
      if (method.kind !== "method") {
        this.raise(key.start, "Constructor can't have get/set modifier");
      }
      if (isGenerator) {
        this.raise(key.start, "Constructor can't be a generator");
      }
      if (isAsync) {
        this.raise(key.start, "Constructor can't be an async method");
      }
      method.kind = "constructor";
      allowsDirectSuper = constructorAllowsSuper;
    } else if (
      method.static &&
      key.type === "Identifier" &&
      key.name === "prototype"
    ) {
      this.raise(
        key.start,
        "Classes may not have a static property named prototype"
      );
    }
    this.parseClassMethod(method, isGenerator, isAsync, allowsDirectSuper);
    if (method.kind === "get" && method.value.params.length !== 0) {
      this.raiseRecoverable(method.value.start, "getter should have no params");
    }
    if (method.kind === "set" && method.value.params.length !== 1) {
      this.raiseRecoverable(
        method.value.start,
        "setter should have exactly one param"
      );
    }
    if (
      method.kind === "set" &&
      method.value.params[0].type === "RestElement"
    ) {
      this.raiseRecoverable(
        method.value.params[0].start,
        "Setter cannot use rest params"
      );
    }
    return method;
  };

  pp$1.parseClassMethod = function(
    method,
    isGenerator,
    isAsync,
    allowsDirectSuper
  ) {
    method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
    return this.finishNode(method, "MethodDefinition");
  };

  pp$1.parseClassId = function(node, isStatement) {
    if (this.type === types.name) {
      node.id = this.parseIdent();
      if (isStatement) {
        this.checkLVal(node.id, BIND_LEXICAL, false);
      }
    } else {
      if (isStatement === true) {
        this.unexpected();
      }
      node.id = null;
    }
  };

  pp$1.parseClassSuper = function(node) {
    node.superClass = this.eat(types._extends)
      ? this.parseExprSubscripts()
      : null;
  };

  // Parses module export declaration.

  pp$1.parseExport = function(node, exports) {
    this.next();
    // export * from '...'
    if (this.eat(types.star)) {
      this.expectContextual("from");
      if (this.type !== types.string) {
        this.unexpected();
      }
      node.source = this.parseExprAtom();
      this.semicolon();
      return this.finishNode(node, "ExportAllDeclaration");
    }
    if (this.eat(types._default)) {
      // export default ...
      this.checkExport(exports, "default", this.lastTokStart);
      var isAsync;
      if (this.type === types._function || (isAsync = this.isAsyncFunction())) {
        var fNode = this.startNode();
        this.next();
        if (isAsync) {
          this.next();
        }
        node.declaration = this.parseFunction(
          fNode,
          FUNC_STATEMENT | FUNC_NULLABLE_ID,
          false,
          isAsync
        );
      } else if (this.type === types._class) {
        var cNode = this.startNode();
        node.declaration = this.parseClass(cNode, "nullableID");
      } else {
        node.declaration = this.parseMaybeAssign();
        this.semicolon();
      }
      return this.finishNode(node, "ExportDefaultDeclaration");
    }
    // export var|const|let|function|class ...
    if (this.shouldParseExportStatement()) {
      node.declaration = this.parseStatement(null);
      if (node.declaration.type === "VariableDeclaration") {
        this.checkVariableExport(exports, node.declaration.declarations);
      } else {
        this.checkExport(
          exports,
          node.declaration.id.name,
          node.declaration.id.start
        );
      }
      node.specifiers = [];
      node.source = null;
    } else {
      // export { x, y as z } [from '...']
      node.declaration = null;
      node.specifiers = this.parseExportSpecifiers(exports);
      if (this.eatContextual("from")) {
        if (this.type !== types.string) {
          this.unexpected();
        }
        node.source = this.parseExprAtom();
      } else {
        for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
          // check for keywords used as local names
          var spec = list[i];

          this.checkUnreserved(spec.local);
          // check if export is defined
          this.checkLocalExport(spec.local);
        }

        node.source = null;
      }
      this.semicolon();
    }
    return this.finishNode(node, "ExportNamedDeclaration");
  };

  pp$1.checkExport = function(exports, name, pos) {
    if (!exports) {
      return;
    }
    if (has(exports, name)) {
      this.raiseRecoverable(pos, "Duplicate export '" + name + "'");
    }
    exports[name] = true;
  };

  pp$1.checkPatternExport = function(exports, pat) {
    var type = pat.type;
    if (type === "Identifier") {
      this.checkExport(exports, pat.name, pat.start);
    } else if (type === "ObjectPattern") {
      for (var i = 0, list = pat.properties; i < list.length; i += 1) {
        var prop = list[i];

        this.checkPatternExport(exports, prop);
      }
    } else if (type === "ArrayPattern") {
      for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
        var elt = list$1[i$1];

        if (elt) {
          this.checkPatternExport(exports, elt);
        }
      }
    } else if (type === "Property") {
      this.checkPatternExport(exports, pat.value);
    } else if (type === "AssignmentPattern") {
      this.checkPatternExport(exports, pat.left);
    } else if (type === "RestElement") {
      this.checkPatternExport(exports, pat.argument);
    } else if (type === "ParenthesizedExpression") {
      this.checkPatternExport(exports, pat.expression);
    }
  };

  pp$1.checkVariableExport = function(exports, decls) {
    if (!exports) {
      return;
    }
    for (var i = 0, list = decls; i < list.length; i += 1) {
      var decl = list[i];

      this.checkPatternExport(exports, decl.id);
    }
  };

  pp$1.shouldParseExportStatement = function() {
    return (
      this.type.keyword === "var" ||
      this.type.keyword === "const" ||
      this.type.keyword === "class" ||
      this.type.keyword === "function" ||
      this.isLet() ||
      this.isAsyncFunction()
    );
  };

  // Parses a comma-separated list of module exports.

  pp$1.parseExportSpecifiers = function(exports) {
    var nodes = [],
      first = true;
    // export { x, y as z } [from '...']
    this.expect(types.braceL);
    while (!this.eat(types.braceR)) {
      if (!first) {
        this.expect(types.comma);
        if (this.afterTrailingComma(types.braceR)) {
          break;
        }
      } else {
        first = false;
      }

      var node = this.startNode();
      node.local = this.parseIdent(true);
      node.exported = this.eatContextual("as")
        ? this.parseIdent(true)
        : node.local;
      this.checkExport(exports, node.exported.name, node.exported.start);
      nodes.push(this.finishNode(node, "ExportSpecifier"));
    }
    return nodes;
  };

  // Parses import declaration.

  pp$1.parseImport = function(node) {
    this.next();
    // import '...'
    if (this.type === types.string) {
      node.specifiers = empty;
      node.source = this.parseExprAtom();
    } else {
      node.specifiers = this.parseImportSpecifiers();
      this.expectContextual("from");
      node.source =
        this.type === types.string ? this.parseExprAtom() : this.unexpected();
    }
    this.semicolon();
    return this.finishNode(node, "ImportDeclaration");
  };

  // Parses a comma-separated list of module imports.

  pp$1.parseImportSpecifiers = function() {
    var nodes = [],
      first = true;
    if (this.type === types.name) {
      // import defaultObj, { x, y as z } from '...'
      var node = this.startNode();
      node.local = this.parseIdent();
      this.checkLVal(node.local, BIND_LEXICAL);
      nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
      if (!this.eat(types.comma)) {
        return nodes;
      }
    }
    if (this.type === types.star) {
      var node$1 = this.startNode();
      this.next();
      this.expectContextual("as");
      node$1.local = this.parseIdent();
      this.checkLVal(node$1.local, BIND_LEXICAL);
      nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
      return nodes;
    }
    this.expect(types.braceL);
    while (!this.eat(types.braceR)) {
      if (!first) {
        this.expect(types.comma);
        if (this.afterTrailingComma(types.braceR)) {
          break;
        }
      } else {
        first = false;
      }

      var node$2 = this.startNode();
      node$2.imported = this.parseIdent(true);
      if (this.eatContextual("as")) {
        node$2.local = this.parseIdent();
      } else {
        this.checkUnreserved(node$2.imported);
        node$2.local = node$2.imported;
      }
      this.checkLVal(node$2.local, BIND_LEXICAL);
      nodes.push(this.finishNode(node$2, "ImportSpecifier"));
    }
    return nodes;
  };

  // Set `ExpressionStatement#directive` property for directive prologues.
  pp$1.adaptDirectivePrologue = function(statements) {
    for (
      var i = 0;
      i < statements.length && this.isDirectiveCandidate(statements[i]);
      ++i
    ) {
      statements[i].directive = statements[i].expression.raw.slice(1, -1);
    }
  };
  pp$1.isDirectiveCandidate = function(statement) {
    return (
      statement.type === "ExpressionStatement" &&
      statement.expression.type === "Literal" &&
      typeof statement.expression.value === "string" &&
      // Reject parenthesized strings.
      (this.input[statement.start] === '"' ||
        this.input[statement.start] === "'")
    );
  };

  var pp$2 = Parser.prototype;

  // Convert existing expression atom to assignable pattern
  // if possible.

  pp$2.toAssignable = function(node, isBinding, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 6 && node) {
      switch (node.type) {
        case "Identifier":
          if (this.inAsync && node.name === "await") {
            this.raise(
              node.start,
              "Cannot use 'await' as identifier inside an async function"
            );
          }
          break;

        case "ObjectPattern":
        case "ArrayPattern":
        case "RestElement":
          break;

        case "ObjectExpression":
          node.type = "ObjectPattern";
          if (refDestructuringErrors) {
            this.checkPatternErrors(refDestructuringErrors, true);
          }
          for (var i = 0, list = node.properties; i < list.length; i += 1) {
            var prop = list[i];

            this.toAssignable(prop, isBinding);
            // Early error:
            //   AssignmentRestProperty[Yield, Await] :
            //     `...` DestructuringAssignmentTarget[Yield, Await]
            //
            //   It is a Syntax Error if |DestructuringAssignmentTarget| is an |ArrayLiteral| or an |ObjectLiteral|.
            if (
              prop.type === "RestElement" &&
              (prop.argument.type === "ArrayPattern" ||
                prop.argument.type === "ObjectPattern")
            ) {
              this.raise(prop.argument.start, "Unexpected token");
            }
          }
          break;

        case "Property":
          // AssignmentProperty has type === "Property"
          if (node.kind !== "init") {
            this.raise(
              node.key.start,
              "Object pattern can't contain getter or setter"
            );
          }
          this.toAssignable(node.value, isBinding);
          break;

        case "ArrayExpression":
          node.type = "ArrayPattern";
          if (refDestructuringErrors) {
            this.checkPatternErrors(refDestructuringErrors, true);
          }
          this.toAssignableList(node.elements, isBinding);
          break;

        case "SpreadElement":
          node.type = "RestElement";
          this.toAssignable(node.argument, isBinding);
          if (node.argument.type === "AssignmentPattern") {
            this.raise(
              node.argument.start,
              "Rest elements cannot have a default value"
            );
          }
          break;

        case "AssignmentExpression":
          if (node.operator !== "=") {
            this.raise(
              node.left.end,
              "Only '=' operator can be used for specifying default value."
            );
          }
          node.type = "AssignmentPattern";
          delete node.operator;
          this.toAssignable(node.left, isBinding);
        // falls through to AssignmentPattern

        case "AssignmentPattern":
          break;

        case "ParenthesizedExpression":
          this.toAssignable(node.expression, isBinding, refDestructuringErrors);
          break;

        case "MemberExpression":
          if (!isBinding) {
            break;
          }

        default:
          this.raise(node.start, "Assigning to rvalue");
      }
    } else if (refDestructuringErrors) {
      this.checkPatternErrors(refDestructuringErrors, true);
    }
    return node;
  };

  // Convert list of expression atoms to binding list.

  pp$2.toAssignableList = function(exprList, isBinding) {
    var end = exprList.length;
    for (var i = 0; i < end; i++) {
      var elt = exprList[i];
      if (elt) {
        this.toAssignable(elt, isBinding);
      }
    }
    if (end) {
      var last = exprList[end - 1];
      if (
        this.options.ecmaVersion === 6 &&
        isBinding &&
        last &&
        last.type === "RestElement" &&
        last.argument.type !== "Identifier"
      ) {
        this.unexpected(last.argument.start);
      }
    }
    return exprList;
  };

  // Parses spread element.

  pp$2.parseSpread = function(refDestructuringErrors) {
    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    return this.finishNode(node, "SpreadElement");
  };

  pp$2.parseRestBinding = function() {
    var node = this.startNode();
    this.next();

    // RestElement inside of a function parameter must be an identifier
    if (this.options.ecmaVersion === 6 && this.type !== types.name) {
      this.unexpected();
    }

    node.argument = this.parseBindingAtom();

    return this.finishNode(node, "RestElement");
  };

  // Parses lvalue (assignable) atom.

  pp$2.parseBindingAtom = function() {
    if (this.options.ecmaVersion >= 6) {
      switch (this.type) {
        case types.bracketL:
          var node = this.startNode();
          this.next();
          node.elements = this.parseBindingList(types.bracketR, true, true);
          return this.finishNode(node, "ArrayPattern");

        case types.braceL:
          return this.parseObj(true);
      }
    }
    return this.parseIdent();
  };

  pp$2.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
    var elts = [],
      first = true;
    while (!this.eat(close)) {
      if (first) {
        first = false;
      } else {
        this.expect(types.comma);
      }
      if (allowEmpty && this.type === types.comma) {
        elts.push(null);
      } else if (allowTrailingComma && this.afterTrailingComma(close)) {
        break;
      } else if (this.type === types.ellipsis) {
        var rest = this.parseRestBinding();
        this.parseBindingListItem(rest);
        elts.push(rest);
        if (this.type === types.comma) {
          this.raise(
            this.start,
            "Comma is not permitted after the rest element"
          );
        }
        this.expect(close);
        break;
      } else {
        var elem = this.parseMaybeDefault(this.start, this.startLoc);
        this.parseBindingListItem(elem);
        elts.push(elem);
      }
    }
    return elts;
  };

  pp$2.parseBindingListItem = function(param) {
    return param;
  };

  // Parses assignment pattern around given atom if possible.

  pp$2.parseMaybeDefault = function(startPos, startLoc, left) {
    left = left || this.parseBindingAtom();
    if (this.options.ecmaVersion < 6 || !this.eat(types.eq)) {
      return left;
    }
    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.right = this.parseMaybeAssign();
    return this.finishNode(node, "AssignmentPattern");
  };

  // Verify that a node is an lval — something that can be assigned
  // to.
  // bindingType can be either:
  // 'var' indicating that the lval creates a 'var' binding
  // 'let' indicating that the lval creates a lexical ('let' or 'const') binding
  // 'none' indicating that the binding should be checked for illegal identifiers, but not for duplicate references

  pp$2.checkLVal = function(expr, bindingType, checkClashes) {
    if (bindingType === void 0) bindingType = BIND_NONE;

    switch (expr.type) {
      case "Identifier":
        if (bindingType === BIND_LEXICAL && expr.name === "let") {
          this.raiseRecoverable(
            expr.start,
            "let is disallowed as a lexically bound name"
          );
        }
        if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
          this.raiseRecoverable(
            expr.start,
            (bindingType ? "Binding " : "Assigning to ") +
              expr.name +
              " in strict mode"
          );
        }
        if (checkClashes) {
          if (has(checkClashes, expr.name)) {
            this.raiseRecoverable(expr.start, "Argument name clash");
          }
          checkClashes[expr.name] = true;
        }
        if (bindingType !== BIND_NONE && bindingType !== BIND_OUTSIDE) {
          this.declareName(expr.name, bindingType, expr.start);
        }
        break;

      case "MemberExpression":
        if (bindingType) {
          this.raiseRecoverable(expr.start, "Binding member expression");
        }
        break;

      case "ObjectPattern":
        for (var i = 0, list = expr.properties; i < list.length; i += 1) {
          var prop = list[i];

          this.checkLVal(prop, bindingType, checkClashes);
        }
        break;

      case "Property":
        // AssignmentProperty has type === "Property"
        this.checkLVal(expr.value, bindingType, checkClashes);
        break;

      case "ArrayPattern":
        for (
          var i$1 = 0, list$1 = expr.elements;
          i$1 < list$1.length;
          i$1 += 1
        ) {
          var elem = list$1[i$1];

          if (elem) {
            this.checkLVal(elem, bindingType, checkClashes);
          }
        }
        break;

      case "AssignmentPattern":
        this.checkLVal(expr.left, bindingType, checkClashes);
        break;

      case "RestElement":
        this.checkLVal(expr.argument, bindingType, checkClashes);
        break;

      case "ParenthesizedExpression":
        this.checkLVal(expr.expression, bindingType, checkClashes);
        break;

      default:
        this.raise(
          expr.start,
          (bindingType ? "Binding" : "Assigning to") + " rvalue"
        );
    }
  };

  // A recursive descent parser operates by defining functions for all

  var pp$3 = Parser.prototype;

  // Check if property name clashes with already added.
  // Object/class getters and setters are not allowed to clash —
  // either with each other or with an init property — and in
  // strict mode, init properties are also not allowed to be repeated.

  pp$3.checkPropClash = function(prop, propHash, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") {
      return;
    }
    if (
      this.options.ecmaVersion >= 6 &&
      (prop.computed || prop.method || prop.shorthand)
    ) {
      return;
    }
    var key = prop.key;
    var name;
    switch (key.type) {
      case "Identifier":
        name = key.name;
        break;
      case "Literal":
        name = String(key.value);
        break;
      default:
        return;
    }
    var kind = prop.kind;
    if (this.options.ecmaVersion >= 6) {
      if (name === "__proto__" && kind === "init") {
        if (propHash.proto) {
          if (refDestructuringErrors) {
            if (refDestructuringErrors.doubleProto < 0) {
              refDestructuringErrors.doubleProto = key.start;
            }
            // Backwards-compat kludge. Can be removed in version 6.0
          } else {
            this.raiseRecoverable(
              key.start,
              "Redefinition of __proto__ property"
            );
          }
        }
        propHash.proto = true;
      }
      return;
    }
    name = "$" + name;
    var other = propHash[name];
    if (other) {
      var redefinition;
      if (kind === "init") {
        redefinition = (this.strict && other.init) || other.get || other.set;
      } else {
        redefinition = other.init || other[kind];
      }
      if (redefinition) {
        this.raiseRecoverable(key.start, "Redefinition of property");
      }
    } else {
      other = propHash[name] = {
        init: false,
        get: false,
        set: false,
      };
    }
    other[kind] = true;
  };

  // ### Expression parsing

  // These nest, from the most general expression type at the top to
  // 'atomic', nondivisible expression types at the bottom. Most of
  // the functions will simply let the function(s) below them parse,
  // and, *if* the syntactic construct they handle is present, wrap
  // the AST node that the inner parser gave them in another node.

  // Parse a full expression. The optional arguments are used to
  // forbid the `in` operator (in for loops initalization expressions)
  // and provide reference for storing '=' operator inside shorthand
  // property assignment in contexts where both object expression
  // and object pattern might appear (so it's possible to raise
  // delayed syntax error at correct position).

  pp$3.parseExpression = function(noIn, refDestructuringErrors) {
    var startPos = this.start,
      startLoc = this.startLoc;
    var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
    if (this.type === types.comma) {
      var node = this.startNodeAt(startPos, startLoc);
      node.expressions = [expr];
      while (this.eat(types.comma)) {
        node.expressions.push(
          this.parseMaybeAssign(noIn, refDestructuringErrors)
        );
      }
      return this.finishNode(node, "SequenceExpression");
    }
    return expr;
  };

  // Parse an assignment expression. This includes applications of
  // operators like `+=`.

  pp$3.parseMaybeAssign = function(
    noIn,
    refDestructuringErrors,
    afterLeftParse
  ) {
    if (this.isContextual("yield")) {
      if (this.inGenerator) {
        return this.parseYield(noIn);
      }
      // The tokenizer will assume an expression is allowed after
      // `yield`, but this isn't that kind of yield
      else {
        this.exprAllowed = false;
      }
    }

    var ownDestructuringErrors = false,
      oldParenAssign = -1,
      oldTrailingComma = -1;
    if (refDestructuringErrors) {
      oldParenAssign = refDestructuringErrors.parenthesizedAssign;
      oldTrailingComma = refDestructuringErrors.trailingComma;
      refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
    } else {
      refDestructuringErrors = new DestructuringErrors();
      ownDestructuringErrors = true;
    }

    var startPos = this.start,
      startLoc = this.startLoc;
    if (this.type === types.parenL || this.type === types.name) {
      this.potentialArrowAt = this.start;
    }
    var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
    if (afterLeftParse) {
      left = afterLeftParse.call(this, left, startPos, startLoc);
    }
    if (this.type.isAssign) {
      var node = this.startNodeAt(startPos, startLoc);
      node.operator = this.value;
      node.left =
        this.type === types.eq
          ? this.toAssignable(left, false, refDestructuringErrors)
          : left;
      if (!ownDestructuringErrors) {
        refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
      }
      if (refDestructuringErrors.shorthandAssign >= node.left.start) {
        refDestructuringErrors.shorthandAssign = -1;
      } // reset because shorthand default was used correctly
      this.checkLVal(left);
      this.next();
      node.right = this.parseMaybeAssign(noIn);
      return this.finishNode(node, "AssignmentExpression");
    } else {
      if (ownDestructuringErrors) {
        this.checkExpressionErrors(refDestructuringErrors, true);
      }
    }
    if (oldParenAssign > -1) {
      refDestructuringErrors.parenthesizedAssign = oldParenAssign;
    }
    if (oldTrailingComma > -1) {
      refDestructuringErrors.trailingComma = oldTrailingComma;
    }
    return left;
  };

  // Parse a ternary conditional (`?:`) operator.

  pp$3.parseMaybeConditional = function(noIn, refDestructuringErrors) {
    var startPos = this.start,
      startLoc = this.startLoc;
    var expr = this.parseExprOps(noIn, refDestructuringErrors);
    if (this.checkExpressionErrors(refDestructuringErrors)) {
      return expr;
    }
    if (this.eat(types.question)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.test = expr;
      node.consequent = this.parseMaybeAssign();
      this.expect(types.colon);
      node.alternate = this.parseMaybeAssign(noIn);
      return this.finishNode(node, "ConditionalExpression");
    }
    return expr;
  };

  // Start the precedence parser.

  pp$3.parseExprOps = function(noIn, refDestructuringErrors) {
    var startPos = this.start,
      startLoc = this.startLoc;
    var expr = this.parseMaybeUnary(refDestructuringErrors, false);
    if (this.checkExpressionErrors(refDestructuringErrors)) {
      return expr;
    }
    return expr.start === startPos && expr.type === "ArrowFunctionExpression"
      ? expr
      : this.parseExprOp(expr, startPos, startLoc, -1, noIn);
  };

  // Parse binary operators with the operator precedence parsing
  // algorithm. `left` is the left-hand side of the operator.
  // `minPrec` provides context that allows the function to stop and
  // defer further parser to one of its callers when it encounters an
  // operator that has a lower precedence than the set it is parsing.

  pp$3.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, noIn) {
    var prec = this.type.binop;
    if (prec != null && (!noIn || this.type !== types._in)) {
      if (prec > minPrec) {
        var logical =
          this.type === types.logicalOR || this.type === types.logicalAND;
        var op = this.value;
        this.next();
        var startPos = this.start,
          startLoc = this.startLoc;
        var right = this.parseExprOp(
          this.parseMaybeUnary(null, false),
          startPos,
          startLoc,
          prec,
          noIn
        );
        var node = this.buildBinary(
          leftStartPos,
          leftStartLoc,
          left,
          right,
          op,
          logical
        );
        return this.parseExprOp(
          node,
          leftStartPos,
          leftStartLoc,
          minPrec,
          noIn
        );
      }
    }
    return left;
  };

  pp$3.buildBinary = function(startPos, startLoc, left, right, op, logical) {
    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.operator = op;
    node.right = right;
    return this.finishNode(
      node,
      logical ? "LogicalExpression" : "BinaryExpression"
    );
  };

  // Parse unary operators, both prefix and postfix.

  pp$3.parseMaybeUnary = function(refDestructuringErrors, sawUnary) {
    var startPos = this.start,
      startLoc = this.startLoc,
      expr;
    if (
      this.isContextual("await") &&
      (this.inAsync ||
        (!this.inFunction && this.options.allowAwaitOutsideFunction))
    ) {
      expr = this.parseAwait();
      sawUnary = true;
    } else if (this.type.prefix) {
      var node = this.startNode(),
        update = this.type === types.incDec;
      node.operator = this.value;
      node.prefix = true;
      this.next();
      node.argument = this.parseMaybeUnary(null, true);
      this.checkExpressionErrors(refDestructuringErrors, true);
      if (update) {
        this.checkLVal(node.argument);
      } else if (
        this.strict &&
        node.operator === "delete" &&
        node.argument.type === "Identifier"
      ) {
        this.raiseRecoverable(
          node.start,
          "Deleting local variable in strict mode"
        );
      } else {
        sawUnary = true;
      }
      expr = this.finishNode(
        node,
        update ? "UpdateExpression" : "UnaryExpression"
      );
    } else {
      expr = this.parseExprSubscripts(refDestructuringErrors);
      if (this.checkExpressionErrors(refDestructuringErrors)) {
        return expr;
      }
      while (this.type.postfix && !this.canInsertSemicolon()) {
        var node$1 = this.startNodeAt(startPos, startLoc);
        node$1.operator = this.value;
        node$1.prefix = false;
        node$1.argument = expr;
        this.checkLVal(expr);
        this.next();
        expr = this.finishNode(node$1, "UpdateExpression");
      }
    }

    if (!sawUnary && this.eat(types.starstar)) {
      return this.buildBinary(
        startPos,
        startLoc,
        expr,
        this.parseMaybeUnary(null, false),
        "**",
        false
      );
    } else {
      return expr;
    }
  };

  // Parse call, dot, and `[]`-subscript expressions.

  pp$3.parseExprSubscripts = function(refDestructuringErrors) {
    var startPos = this.start,
      startLoc = this.startLoc;
    var expr = this.parseExprAtom(refDestructuringErrors);
    if (
      expr.type === "ArrowFunctionExpression" &&
      this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")"
    ) {
      return expr;
    }
    var result = this.parseSubscripts(expr, startPos, startLoc);
    if (refDestructuringErrors && result.type === "MemberExpression") {
      if (refDestructuringErrors.parenthesizedAssign >= result.start) {
        refDestructuringErrors.parenthesizedAssign = -1;
      }
      if (refDestructuringErrors.parenthesizedBind >= result.start) {
        refDestructuringErrors.parenthesizedBind = -1;
      }
    }
    return result;
  };

  pp$3.parseSubscripts = function(base, startPos, startLoc, noCalls) {
    var maybeAsyncArrow =
      this.options.ecmaVersion >= 8 &&
      base.type === "Identifier" &&
      base.name === "async" &&
      this.lastTokEnd === base.end &&
      !this.canInsertSemicolon() &&
      this.input.slice(base.start, base.end) === "async";
    while (true) {
      var element = this.parseSubscript(
        base,
        startPos,
        startLoc,
        noCalls,
        maybeAsyncArrow
      );
      if (element === base || element.type === "ArrowFunctionExpression") {
        return element;
      }
      base = element;
    }
  };

  pp$3.parseSubscript = function(
    base,
    startPos,
    startLoc,
    noCalls,
    maybeAsyncArrow
  ) {
    var computed = this.eat(types.bracketL);
    if (computed || this.eat(types.dot)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = computed
        ? this.parseExpression()
        : this.parseIdent(this.options.allowReserved !== "never");
      node.computed = !!computed;
      if (computed) {
        this.expect(types.bracketR);
      }
      base = this.finishNode(node, "MemberExpression");
    } else if (!noCalls && this.eat(types.parenL)) {
      var refDestructuringErrors = new DestructuringErrors(),
        oldYieldPos = this.yieldPos,
        oldAwaitPos = this.awaitPos,
        oldAwaitIdentPos = this.awaitIdentPos;
      this.yieldPos = 0;
      this.awaitPos = 0;
      this.awaitIdentPos = 0;
      var exprList = this.parseExprList(
        types.parenR,
        this.options.ecmaVersion >= 8,
        false,
        refDestructuringErrors
      );
      if (
        maybeAsyncArrow &&
        !this.canInsertSemicolon() &&
        this.eat(types.arrow)
      ) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();
        if (this.awaitIdentPos > 0) {
          this.raise(
            this.awaitIdentPos,
            "Cannot use 'await' as identifier inside an async function"
          );
        }
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.parseArrowExpression(
          this.startNodeAt(startPos, startLoc),
          exprList,
          true
        );
      }
      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;
      this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.callee = base;
      node$1.arguments = exprList;
      base = this.finishNode(node$1, "CallExpression");
    } else if (this.type === types.backQuote) {
      var node$2 = this.startNodeAt(startPos, startLoc);
      node$2.tag = base;
      node$2.quasi = this.parseTemplate({ isTagged: true });
      base = this.finishNode(node$2, "TaggedTemplateExpression");
    }
    return base;
  };

  // Parse an atomic expression — either a single token that is an
  // expression, an expression started by a keyword like `function` or
  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
  // or `{}`.

  pp$3.parseExprAtom = function(refDestructuringErrors) {
    // If a division operator appears in an expression position, the
    // tokenizer got confused, and we force it to read a regexp instead.
    if (this.type === types.slash) {
      this.readRegexp();
    }

    var node,
      canBeArrow = this.potentialArrowAt === this.start;
    switch (this.type) {
      case types._super:
        if (!this.allowSuper) {
          this.raise(this.start, "'super' keyword outside a method");
        }
        node = this.startNode();
        this.next();
        if (this.type === types.parenL && !this.allowDirectSuper) {
          this.raise(
            node.start,
            "super() call outside constructor of a subclass"
          );
        }
        // The `super` keyword can appear at below:
        // SuperProperty:
        //     super [ Expression ]
        //     super . IdentifierName
        // SuperCall:
        //     super ( Arguments )
        if (
          this.type !== types.dot &&
          this.type !== types.bracketL &&
          this.type !== types.parenL
        ) {
          this.unexpected();
        }
        return this.finishNode(node, "Super");

      case types._this:
        node = this.startNode();
        this.next();
        return this.finishNode(node, "ThisExpression");

      case types.name:
        var startPos = this.start,
          startLoc = this.startLoc,
          containsEsc = this.containsEsc;
        var id = this.parseIdent(false);
        if (
          this.options.ecmaVersion >= 8 &&
          !containsEsc &&
          id.name === "async" &&
          !this.canInsertSemicolon() &&
          this.eat(types._function)
        ) {
          return this.parseFunction(
            this.startNodeAt(startPos, startLoc),
            0,
            false,
            true
          );
        }
        if (canBeArrow && !this.canInsertSemicolon()) {
          if (this.eat(types.arrow)) {
            return this.parseArrowExpression(
              this.startNodeAt(startPos, startLoc),
              [id],
              false
            );
          }
          if (
            this.options.ecmaVersion >= 8 &&
            id.name === "async" &&
            this.type === types.name &&
            !containsEsc
          ) {
            id = this.parseIdent(false);
            if (this.canInsertSemicolon() || !this.eat(types.arrow)) {
              this.unexpected();
            }
            return this.parseArrowExpression(
              this.startNodeAt(startPos, startLoc),
              [id],
              true
            );
          }
        }
        return id;

      case types.regexp:
        var value = this.value;
        node = this.parseLiteral(value.value);
        node.regex = { pattern: value.pattern, flags: value.flags };
        return node;

      case types.num:
      case types.string:
        return this.parseLiteral(this.value);

      case types._null:
      case types._true:
      case types._false:
        node = this.startNode();
        node.value =
          this.type === types._null ? null : this.type === types._true;
        node.raw = this.type.keyword;
        this.next();
        return this.finishNode(node, "Literal");

      case types.parenL:
        var start = this.start,
          expr = this.parseParenAndDistinguishExpression(canBeArrow);
        if (refDestructuringErrors) {
          if (
            refDestructuringErrors.parenthesizedAssign < 0 &&
            !this.isSimpleAssignTarget(expr)
          ) {
            refDestructuringErrors.parenthesizedAssign = start;
          }
          if (refDestructuringErrors.parenthesizedBind < 0) {
            refDestructuringErrors.parenthesizedBind = start;
          }
        }
        return expr;

      case types.bracketL:
        node = this.startNode();
        this.next();
        node.elements = this.parseExprList(
          types.bracketR,
          true,
          true,
          refDestructuringErrors
        );
        return this.finishNode(node, "ArrayExpression");

      case types.braceL:
        return this.parseObj(false, refDestructuringErrors);

      case types._function:
        node = this.startNode();
        this.next();
        return this.parseFunction(node, 0);

      case types._class:
        return this.parseClass(this.startNode(), false);

      case types._new:
        return this.parseNew();

      case types.backQuote:
        return this.parseTemplate();

      case types._import:
        if (this.options.ecmaVersion >= 11) {
          return this.parseExprImport();
        } else {
          return this.unexpected();
        }

      default:
        this.unexpected();
    }
  };

  pp$3.parseExprImport = function() {
    var node = this.startNode();
    this.next(); // skip `import`
    switch (this.type) {
      case types.parenL:
        return this.parseDynamicImport(node);
      default:
        this.unexpected();
    }
  };

  pp$3.parseDynamicImport = function(node) {
    this.next(); // skip `(`

    // Parse node.source.
    node.source = this.parseMaybeAssign();

    // Verify ending.
    if (!this.eat(types.parenR)) {
      var errorPos = this.start;
      if (this.eat(types.comma) && this.eat(types.parenR)) {
        this.raiseRecoverable(
          errorPos,
          "Trailing comma is not allowed in import()"
        );
      } else {
        this.unexpected(errorPos);
      }
    }

    return this.finishNode(node, "ImportExpression");
  };

  pp$3.parseLiteral = function(value) {
    var node = this.startNode();
    node.value = value;
    node.raw = this.input.slice(this.start, this.end);
    if (node.raw.charCodeAt(node.raw.length - 1) === 110) {
      node.bigint = node.raw.slice(0, -1);
    }
    this.next();
    return this.finishNode(node, "Literal");
  };

  pp$3.parseParenExpression = function() {
    this.expect(types.parenL);
    var val = this.parseExpression();
    this.expect(types.parenR);
    return val;
  };

  pp$3.parseParenAndDistinguishExpression = function(canBeArrow) {
    var startPos = this.start,
      startLoc = this.startLoc,
      val,
      allowTrailingComma = this.options.ecmaVersion >= 8;
    if (this.options.ecmaVersion >= 6) {
      this.next();

      var innerStartPos = this.start,
        innerStartLoc = this.startLoc;
      var exprList = [],
        first = true,
        lastIsComma = false;
      var refDestructuringErrors = new DestructuringErrors(),
        oldYieldPos = this.yieldPos,
        oldAwaitPos = this.awaitPos,
        spreadStart;
      this.yieldPos = 0;
      this.awaitPos = 0;
      // Do not save awaitIdentPos to allow checking awaits nested in parameters
      while (this.type !== types.parenR) {
        first ? (first = false) : this.expect(types.comma);
        if (allowTrailingComma && this.afterTrailingComma(types.parenR, true)) {
          lastIsComma = true;
          break;
        } else if (this.type === types.ellipsis) {
          spreadStart = this.start;
          exprList.push(this.parseParenItem(this.parseRestBinding()));
          if (this.type === types.comma) {
            this.raise(
              this.start,
              "Comma is not permitted after the rest element"
            );
          }
          break;
        } else {
          exprList.push(
            this.parseMaybeAssign(
              false,
              refDestructuringErrors,
              this.parseParenItem
            )
          );
        }
      }
      var innerEndPos = this.start,
        innerEndLoc = this.startLoc;
      this.expect(types.parenR);

      if (canBeArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        return this.parseParenArrowList(startPos, startLoc, exprList);
      }

      if (!exprList.length || lastIsComma) {
        this.unexpected(this.lastTokStart);
      }
      if (spreadStart) {
        this.unexpected(spreadStart);
      }
      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;

      if (exprList.length > 1) {
        val = this.startNodeAt(innerStartPos, innerStartLoc);
        val.expressions = exprList;
        this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
      } else {
        val = exprList[0];
      }
    } else {
      val = this.parseParenExpression();
    }

    if (this.options.preserveParens) {
      var par = this.startNodeAt(startPos, startLoc);
      par.expression = val;
      return this.finishNode(par, "ParenthesizedExpression");
    } else {
      return val;
    }
  };

  pp$3.parseParenItem = function(item) {
    return item;
  };

  pp$3.parseParenArrowList = function(startPos, startLoc, exprList) {
    return this.parseArrowExpression(
      this.startNodeAt(startPos, startLoc),
      exprList
    );
  };

  // New's precedence is slightly tricky. It must allow its argument to
  // be a `[]` or dot subscript expression, but not a call — at least,
  // not without wrapping it in parentheses. Thus, it uses the noCalls
  // argument to parseSubscripts to prevent it from consuming the
  // argument list.

  var empty$1 = [];

  pp$3.parseNew = function() {
    if (this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword new");
    }
    var node = this.startNode();
    var meta = this.parseIdent(true);
    if (this.options.ecmaVersion >= 6 && this.eat(types.dot)) {
      node.meta = meta;
      var containsEsc = this.containsEsc;
      node.property = this.parseIdent(true);
      if (node.property.name !== "target" || containsEsc) {
        this.raiseRecoverable(
          node.property.start,
          "The only valid meta property for new is new.target"
        );
      }
      if (!this.inNonArrowFunction()) {
        this.raiseRecoverable(
          node.start,
          "new.target can only be used in functions"
        );
      }
      return this.finishNode(node, "MetaProperty");
    }
    var startPos = this.start,
      startLoc = this.startLoc,
      isImport = this.type === types._import;
    node.callee = this.parseSubscripts(
      this.parseExprAtom(),
      startPos,
      startLoc,
      true
    );
    if (isImport && node.callee.type === "ImportExpression") {
      this.raise(startPos, "Cannot use new with import()");
    }
    if (this.eat(types.parenL)) {
      node.arguments = this.parseExprList(
        types.parenR,
        this.options.ecmaVersion >= 8,
        false
      );
    } else {
      node.arguments = empty$1;
    }
    return this.finishNode(node, "NewExpression");
  };

  // Parse template expression.

  pp$3.parseTemplateElement = function(ref) {
    var isTagged = ref.isTagged;

    var elem = this.startNode();
    if (this.type === types.invalidTemplate) {
      if (!isTagged) {
        this.raiseRecoverable(
          this.start,
          "Bad escape sequence in untagged template literal"
        );
      }
      elem.value = {
        raw: this.value,
        cooked: null,
      };
    } else {
      elem.value = {
        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
        cooked: this.value,
      };
    }
    this.next();
    elem.tail = this.type === types.backQuote;
    return this.finishNode(elem, "TemplateElement");
  };

  pp$3.parseTemplate = function(ref) {
    if (ref === void 0) ref = {};
    var isTagged = ref.isTagged;
    if (isTagged === void 0) isTagged = false;

    var node = this.startNode();
    this.next();
    node.expressions = [];
    var curElt = this.parseTemplateElement({ isTagged: isTagged });
    node.quasis = [curElt];
    while (!curElt.tail) {
      if (this.type === types.eof) {
        this.raise(this.pos, "Unterminated template literal");
      }
      this.expect(types.dollarBraceL);
      node.expressions.push(this.parseExpression());
      this.expect(types.braceR);
      node.quasis.push(
        (curElt = this.parseTemplateElement({ isTagged: isTagged }))
      );
    }
    this.next();
    return this.finishNode(node, "TemplateLiteral");
  };

  pp$3.isAsyncProp = function(prop) {
    return (
      !prop.computed &&
      prop.key.type === "Identifier" &&
      prop.key.name === "async" &&
      (this.type === types.name ||
        this.type === types.num ||
        this.type === types.string ||
        this.type === types.bracketL ||
        this.type.keyword ||
        (this.options.ecmaVersion >= 9 && this.type === types.star)) &&
      !lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
    );
  };

  // Parse an object literal or binding pattern.

  pp$3.parseObj = function(isPattern, refDestructuringErrors) {
    var node = this.startNode(),
      first = true,
      propHash = {};
    node.properties = [];
    this.next();
    while (!this.eat(types.braceR)) {
      if (!first) {
        this.expect(types.comma);
        if (
          this.options.ecmaVersion >= 5 &&
          this.afterTrailingComma(types.braceR)
        ) {
          break;
        }
      } else {
        first = false;
      }

      var prop = this.parseProperty(isPattern, refDestructuringErrors);
      if (!isPattern) {
        this.checkPropClash(prop, propHash, refDestructuringErrors);
      }
      node.properties.push(prop);
    }
    return this.finishNode(
      node,
      isPattern ? "ObjectPattern" : "ObjectExpression"
    );
  };

  pp$3.parseProperty = function(isPattern, refDestructuringErrors) {
    var prop = this.startNode(),
      isGenerator,
      isAsync,
      startPos,
      startLoc;
    if (this.options.ecmaVersion >= 9 && this.eat(types.ellipsis)) {
      if (isPattern) {
        prop.argument = this.parseIdent(false);
        if (this.type === types.comma) {
          this.raise(
            this.start,
            "Comma is not permitted after the rest element"
          );
        }
        return this.finishNode(prop, "RestElement");
      }
      // To disallow parenthesized identifier via `this.toAssignable()`.
      if (this.type === types.parenL && refDestructuringErrors) {
        if (refDestructuringErrors.parenthesizedAssign < 0) {
          refDestructuringErrors.parenthesizedAssign = this.start;
        }
        if (refDestructuringErrors.parenthesizedBind < 0) {
          refDestructuringErrors.parenthesizedBind = this.start;
        }
      }
      // Parse argument.
      prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
      // To disallow trailing comma via `this.toAssignable()`.
      if (
        this.type === types.comma &&
        refDestructuringErrors &&
        refDestructuringErrors.trailingComma < 0
      ) {
        refDestructuringErrors.trailingComma = this.start;
      }
      // Finish
      return this.finishNode(prop, "SpreadElement");
    }
    if (this.options.ecmaVersion >= 6) {
      prop.method = false;
      prop.shorthand = false;
      if (isPattern || refDestructuringErrors) {
        startPos = this.start;
        startLoc = this.startLoc;
      }
      if (!isPattern) {
        isGenerator = this.eat(types.star);
      }
    }
    var containsEsc = this.containsEsc;
    this.parsePropertyName(prop);
    if (
      !isPattern &&
      !containsEsc &&
      this.options.ecmaVersion >= 8 &&
      !isGenerator &&
      this.isAsyncProp(prop)
    ) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
      this.parsePropertyName(prop, refDestructuringErrors);
    } else {
      isAsync = false;
    }
    this.parsePropertyValue(
      prop,
      isPattern,
      isGenerator,
      isAsync,
      startPos,
      startLoc,
      refDestructuringErrors,
      containsEsc
    );
    return this.finishNode(prop, "Property");
  };

  pp$3.parsePropertyValue = function(
    prop,
    isPattern,
    isGenerator,
    isAsync,
    startPos,
    startLoc,
    refDestructuringErrors,
    containsEsc
  ) {
    if ((isGenerator || isAsync) && this.type === types.colon) {
      this.unexpected();
    }

    if (this.eat(types.colon)) {
      prop.value = isPattern
        ? this.parseMaybeDefault(this.start, this.startLoc)
        : this.parseMaybeAssign(false, refDestructuringErrors);
      prop.kind = "init";
    } else if (this.options.ecmaVersion >= 6 && this.type === types.parenL) {
      if (isPattern) {
        this.unexpected();
      }
      prop.kind = "init";
      prop.method = true;
      prop.value = this.parseMethod(isGenerator, isAsync);
    } else if (
      !isPattern &&
      !containsEsc &&
      this.options.ecmaVersion >= 5 &&
      !prop.computed &&
      prop.key.type === "Identifier" &&
      (prop.key.name === "get" || prop.key.name === "set") &&
      this.type !== types.comma && this.type !== types.braceR
    ) {
      if (isGenerator || isAsync) {
        this.unexpected();
      }
      prop.kind = prop.key.name;
      this.parsePropertyName(prop);
      prop.value = this.parseMethod(false);
      var paramCount = prop.kind === "get" ? 0 : 1;
      if (prop.value.params.length !== paramCount) {
        var start = prop.value.start;
        if (prop.kind === "get") {
          this.raiseRecoverable(start, "getter should have no params");
        } else {
          this.raiseRecoverable(start, "setter should have exactly one param");
        }
      } else {
        if (
          prop.kind === "set" &&
          prop.value.params[0].type === "RestElement"
        ) {
          this.raiseRecoverable(
            prop.value.params[0].start,
            "Setter cannot use rest params"
          );
        }
      }
    } else if (
      this.options.ecmaVersion >= 6 &&
      !prop.computed &&
      prop.key.type === "Identifier"
    ) {
      if (isGenerator || isAsync) {
        this.unexpected();
      }
      this.checkUnreserved(prop.key);
      if (prop.key.name === "await" && !this.awaitIdentPos) {
        this.awaitIdentPos = startPos;
      }
      prop.kind = "init";
      if (isPattern) {
        prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
      } else if (this.type === types.eq && refDestructuringErrors) {
        if (refDestructuringErrors.shorthandAssign < 0) {
          refDestructuringErrors.shorthandAssign = this.start;
        }
        prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
      } else {
        prop.value = prop.key;
      }
      prop.shorthand = true;
    } else {
      this.unexpected();
    }
  };

  pp$3.parsePropertyName = function(prop) {
    if (this.options.ecmaVersion >= 6) {
      if (this.eat(types.bracketL)) {
        prop.computed = true;
        prop.key = this.parseMaybeAssign();
        this.expect(types.bracketR);
        return prop.key;
      } else {
        prop.computed = false;
      }
    }
    return (prop.key =
      this.type === types.num || this.type === types.string
        ? this.parseExprAtom()
        : this.parseIdent(this.options.allowReserved !== "never"));
  };

  // Initialize empty function node.

  pp$3.initFunction = function(node) {
    node.id = null;
    if (this.options.ecmaVersion >= 6) {
      node.generator = node.expression = false;
    }
    if (this.options.ecmaVersion >= 8) {
      node.async = false;
    }
  };

  // Parse object or class method.

  pp$3.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
    var node = this.startNode(),
      oldYieldPos = this.yieldPos,
      oldAwaitPos = this.awaitPos,
      oldAwaitIdentPos = this.awaitIdentPos;

    this.initFunction(node);
    if (this.options.ecmaVersion >= 6) {
      node.generator = isGenerator;
    }
    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }

    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(
      functionFlags(isAsync, node.generator) |
        SCOPE_SUPER |
        (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0)
    );

    this.expect(types.parenL);
    node.params = this.parseBindingList(
      types.parenR,
      false,
      this.options.ecmaVersion >= 8
    );
    this.checkYieldAwaitInDefaultParams();
    this.parseFunctionBody(node, false, true);

    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "FunctionExpression");
  };

  // Parse arrow function expression with given parameters.

  pp$3.parseArrowExpression = function(node, params, isAsync) {
    var oldYieldPos = this.yieldPos,
      oldAwaitPos = this.awaitPos,
      oldAwaitIdentPos = this.awaitIdentPos;

    this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
    this.initFunction(node);
    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }

    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;

    node.params = this.toAssignableList(params, true);
    this.parseFunctionBody(node, true, false);

    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "ArrowFunctionExpression");
  };

  // Parse function body and check parameters.

  pp$3.parseFunctionBody = function(node, isArrowFunction, isMethod) {
    var isExpression = isArrowFunction && this.type !== types.braceL;
    var oldStrict = this.strict,
      useStrict = false;

    if (isExpression) {
      node.body = this.parseMaybeAssign();
      node.expression = true;
      this.checkParams(node, false);
    } else {
      var nonSimple =
        this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
      if (!oldStrict || nonSimple) {
        useStrict = this.strictDirective(this.end);
        // If this is a strict mode function, verify that argument names
        // are not repeated, and it does not try to bind the words `eval`
        // or `arguments`.
        if (useStrict && nonSimple) {
          this.raiseRecoverable(
            node.start,
            "Illegal 'use strict' directive in function with non-simple parameter list"
          );
        }
      }
      // Start a new scope with regard to labels and the `inFunction`
      // flag (restore them to their old value afterwards).
      var oldLabels = this.labels;
      this.labels = [];
      if (useStrict) {
        this.strict = true;
      }

      // Add the params to varDeclaredNames to ensure that an error is thrown
      // if a let/const declaration in the function clashes with one of the params.
      this.checkParams(
        node,
        !oldStrict &&
          !useStrict &&
          !isArrowFunction &&
          !isMethod &&
          this.isSimpleParamList(node.params)
      );
      node.body = this.parseBlock(false);
      node.expression = false;
      this.adaptDirectivePrologue(node.body.body);
      this.labels = oldLabels;
    }
    this.exitScope();

    // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
    if (this.strict && node.id) {
      this.checkLVal(node.id, BIND_OUTSIDE);
    }
    this.strict = oldStrict;
  };

  pp$3.isSimpleParamList = function(params) {
    for (var i = 0, list = params; i < list.length; i += 1) {
      var param = list[i];

      if (param.type !== "Identifier") {
        return false;
      }
    }
    return true;
  };

  // Checks function params for various disallowed patterns such as using "eval"
  // or "arguments" and duplicate parameters.

  pp$3.checkParams = function(node, allowDuplicates) {
    var nameHash = {};
    for (var i = 0, list = node.params; i < list.length; i += 1) {
      var param = list[i];

      this.checkLVal(param, BIND_VAR, allowDuplicates ? null : nameHash);
    }
  };

  // Parses a comma-separated list of expressions, and returns them as
  // an array. `close` is the token type that ends the list, and
  // `allowEmpty` can be turned on to allow subsequent commas with
  // nothing in between them to be parsed as `null` (which is needed
  // for array literals).

  pp$3.parseExprList = function(
    close,
    allowTrailingComma,
    allowEmpty,
    refDestructuringErrors
  ) {
    var elts = [],
      first = true;
    while (!this.eat(close)) {
      if (!first) {
        this.expect(types.comma);
        if (allowTrailingComma && this.afterTrailingComma(close)) {
          break;
        }
      } else {
        first = false;
      }

      var elt = void 0;
      if (allowEmpty && this.type === types.comma) {
        elt = null;
      } else if (this.type === types.ellipsis) {
        elt = this.parseSpread(refDestructuringErrors);
        if (
          refDestructuringErrors &&
          this.type === types.comma &&
          refDestructuringErrors.trailingComma < 0
        ) {
          refDestructuringErrors.trailingComma = this.start;
        }
      } else {
        elt = this.parseMaybeAssign(false, refDestructuringErrors);
      }
      elts.push(elt);
    }
    return elts;
  };

  pp$3.checkUnreserved = function(ref) {
    var start = ref.start;
    var end = ref.end;
    var name = ref.name;

    if (this.inGenerator && name === "yield") {
      this.raiseRecoverable(
        start,
        "Cannot use 'yield' as identifier inside a generator"
      );
    }
    if (this.inAsync && name === "await") {
      this.raiseRecoverable(
        start,
        "Cannot use 'await' as identifier inside an async function"
      );
    }
    if (this.keywords.test(name)) {
      this.raise(start, "Unexpected keyword '" + name + "'");
    }
    if (
      this.options.ecmaVersion < 6 &&
      this.input.slice(start, end).indexOf("\\") !== -1
    ) {
      return;
    }
    var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
    if (re.test(name)) {
      if (!this.inAsync && name === "await") {
        this.raiseRecoverable(
          start,
          "Cannot use keyword 'await' outside an async function"
        );
      }
      this.raiseRecoverable(start, "The keyword '" + name + "' is reserved");
    }
  };

  // Parse the next token as an identifier. If `liberal` is true (used
  // when parsing properties), it will also convert keywords into
  // identifiers.

  pp$3.parseIdent = function(liberal, isBinding) {
    var node = this.startNode();
    if (this.type === types.name) {
      node.name = this.value;
    } else if (this.type.keyword) {
      node.name = this.type.keyword;

      // To fix https://github.com/acornjs/acorn/issues/575
      // `class` and `function` keywords push new context into this.context.
      // But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
      // If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword
      if (
        (node.name === "class" || node.name === "function") &&
        (this.lastTokEnd !== this.lastTokStart + 1 ||
          this.input.charCodeAt(this.lastTokStart) !== 46)
      ) {
        this.context.pop();
      }
    } else {
      this.unexpected();
    }
    this.next(!!liberal);
    this.finishNode(node, "Identifier");
    if (!liberal) {
      this.checkUnreserved(node);
      if (node.name === "await" && !this.awaitIdentPos) {
        this.awaitIdentPos = node.start;
      }
    }
    return node;
  };

  // Parses yield expression inside generator.

  pp$3.parseYield = function(noIn) {
    if (!this.yieldPos) {
      this.yieldPos = this.start;
    }

    var node = this.startNode();
    this.next();
    if (
      this.type === types.semi ||
      this.canInsertSemicolon() ||
      (this.type !== types.star && !this.type.startsExpr)
    ) {
      node.delegate = false;
      node.argument = null;
    } else {
      node.delegate = this.eat(types.star);
      node.argument = this.parseMaybeAssign(noIn);
    }
    return this.finishNode(node, "YieldExpression");
  };

  pp$3.parseAwait = function() {
    if (!this.awaitPos) {
      this.awaitPos = this.start;
    }

    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeUnary(null, false);
    return this.finishNode(node, "AwaitExpression");
  };

  var pp$4 = Parser.prototype;

  // This function is used to raise exceptions on parse errors. It
  // takes an offset integer (into the current `input`) to indicate
  // the location of the error, attaches the position to the end
  // of the error message, and then raises a `SyntaxError` with that
  // message.

  pp$4.raise = function(pos, message) {
    var loc = getLineInfo(this.input, pos);
    message += " (" + loc.line + ":" + loc.column + ")";
    var err = new SyntaxError(message);
    err.pos = pos;
    err.loc = loc;
    err.raisedAt = this.pos;
    throw err;
  };

  pp$4.raiseRecoverable = pp$4.raise;

  pp$4.curPosition = function() {
    if (this.options.locations) {
      return new Position(this.curLine, this.pos - this.lineStart);
    }
  };

  var pp$5 = Parser.prototype;

  var Scope = function Scope(flags) {
    this.flags = flags;
    // A list of var-declared names in the current lexical scope
    this.var = [];
    // A list of lexically-declared names in the current lexical scope
    this.lexical = [];
    // A list of lexically-declared FunctionDeclaration names in the current lexical scope
    this.functions = [];
  };

  // The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

  pp$5.enterScope = function(flags) {
    this.scopeStack.push(new Scope(flags));
  };

  pp$5.exitScope = function() {
    this.scopeStack.pop();
  };

  // The spec says:
  // > At the top level of a function, or script, function declarations are
  // > treated like var declarations rather than like lexical declarations.
  pp$5.treatFunctionsAsVarInScope = function(scope) {
    return (
      scope.flags & SCOPE_FUNCTION ||
      (!this.inModule && scope.flags & SCOPE_TOP)
    );
  };

  pp$5.declareName = function(name, bindingType, pos) {
    var redeclared = false;
    if (bindingType === BIND_LEXICAL) {
      var scope = this.currentScope();
      redeclared =
        scope.lexical.indexOf(name) > -1 ||
        scope.functions.indexOf(name) > -1 ||
        scope.var.indexOf(name) > -1;
      scope.lexical.push(name);
      if (this.inModule && scope.flags & SCOPE_TOP) {
        delete this.undefinedExports[name];
      }
    } else if (bindingType === BIND_SIMPLE_CATCH) {
      var scope$1 = this.currentScope();
      scope$1.lexical.push(name);
    } else if (bindingType === BIND_FUNCTION) {
      var scope$2 = this.currentScope();
      if (this.treatFunctionsAsVar) {
        redeclared = scope$2.lexical.indexOf(name) > -1;
      } else {
        redeclared =
          scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1;
      }
      scope$2.functions.push(name);
    } else {
      for (var i = this.scopeStack.length - 1; i >= 0; --i) {
        var scope$3 = this.scopeStack[i];
        if (
          (scope$3.lexical.indexOf(name) > -1 &&
            !(
              scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name
            )) ||
          (!this.treatFunctionsAsVarInScope(scope$3) &&
            scope$3.functions.indexOf(name) > -1)
        ) {
          redeclared = true;
          break;
        }
        scope$3.var.push(name);
        if (this.inModule && scope$3.flags & SCOPE_TOP) {
          delete this.undefinedExports[name];
        }
        if (scope$3.flags & SCOPE_VAR) {
          break;
        }
      }
    }
    if (redeclared) {
      this.raiseRecoverable(
        pos,
        "Identifier '" + name + "' has already been declared"
      );
    }
  };

  pp$5.checkLocalExport = function(id) {
    // scope.functions must be empty as Module code is always strict.
    if (
      this.scopeStack[0].lexical.indexOf(id.name) === -1 &&
      this.scopeStack[0].var.indexOf(id.name) === -1
    ) {
      this.undefinedExports[id.name] = id;
    }
  };

  pp$5.currentScope = function() {
    return this.scopeStack[this.scopeStack.length - 1];
  };

  pp$5.currentVarScope = function() {
    for (var i = this.scopeStack.length - 1; ; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & SCOPE_VAR) {
        return scope;
      }
    }
  };

  // Could be useful for `this`, `new.target`, `super()`, `super.property`, and `super[property]`.
  pp$5.currentThisScope = function() {
    for (var i = this.scopeStack.length - 1; ; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW)) {
        return scope;
      }
    }
  };

  var Node = function Node(parser, pos, loc) {
    this.type = "";
    this.start = pos;
    this.end = 0;
    if (parser.options.locations) {
      this.loc = new SourceLocation(parser, loc);
    }
    if (parser.options.directSourceFile) {
      this.sourceFile = parser.options.directSourceFile;
    }
    if (parser.options.ranges) {
      this.range = [pos, 0];
    }
  };

  // Start an AST node, attaching a start offset.

  var pp$6 = Parser.prototype;

  pp$6.startNode = function() {
    return new Node(this, this.start, this.startLoc);
  };

  pp$6.startNodeAt = function(pos, loc) {
    return new Node(this, pos, loc);
  };

  // Finish an AST node, adding `type` and `end` properties.

  function finishNodeAt(node, type, pos, loc) {
    node.type = type;
    node.end = pos;
    if (this.options.locations) {
      node.loc.end = loc;
    }
    if (this.options.ranges) {
      node.range[1] = pos;
    }
    return node;
  }

  pp$6.finishNode = function(node, type) {
    return finishNodeAt.call(
      this,
      node,
      type,
      this.lastTokEnd,
      this.lastTokEndLoc
    );
  };

  // Finish node at given position

  pp$6.finishNodeAt = function(node, type, pos, loc) {
    return finishNodeAt.call(this, node, type, pos, loc);
  };

  // The algorithm used to determine whether a regexp can appear at a

  var TokContext = function TokContext(
    token,
    isExpr,
    preserveSpace,
    override,
    generator
  ) {
    this.token = token;
    this.isExpr = !!isExpr;
    this.preserveSpace = !!preserveSpace;
    this.override = override;
    this.generator = !!generator;
  };

  var types$1 = {
    b_stat: new TokContext("{", false),
    b_expr: new TokContext("{", true),
    b_tmpl: new TokContext("${", false),
    p_stat: new TokContext("(", false),
    p_expr: new TokContext("(", true),
    q_tmpl: new TokContext("`", true, true, function(p) {
      return p.tryReadTemplateToken();
    }),
    f_stat: new TokContext("function", false),
    f_expr: new TokContext("function", true),
    f_expr_gen: new TokContext("function", true, false, null, true),
    f_gen: new TokContext("function", false, false, null, true),
  };

  var pp$7 = Parser.prototype;

  pp$7.initialContext = function() {
    return [types$1.b_stat];
  };

  pp$7.braceIsBlock = function(prevType) {
    var parent = this.curContext();
    if (parent === types$1.f_expr || parent === types$1.f_stat) {
      return true;
    }
    if (
      prevType === types.colon &&
      (parent === types$1.b_stat || parent === types$1.b_expr)
    ) {
      return !parent.isExpr;
    }

    // The check for `tt.name && exprAllowed` detects whether we are
    // after a `yield` or `of` construct. See the `updateContext` for
    // `tt.name`.
    if (
      prevType === types._return ||
      (prevType === types.name && this.exprAllowed)
    ) {
      return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
    }
    if (
      prevType === types._else ||
      prevType === types.semi ||
      prevType === types.eof ||
      prevType === types.parenR ||
      prevType === types.arrow
    ) {
      return true;
    }
    if (prevType === types.braceL) {
      return parent === types$1.b_stat;
    }
    if (
      prevType === types._var ||
      prevType === types._const ||
      prevType === types.name
    ) {
      return false;
    }
    return !this.exprAllowed;
  };

  pp$7.inGeneratorContext = function() {
    for (var i = this.context.length - 1; i >= 1; i--) {
      var context = this.context[i];
      if (context.token === "function") {
        return context.generator;
      }
    }
    return false;
  };

  pp$7.updateContext = function(prevType) {
    var update,
      type = this.type;
    if (type.keyword && prevType === types.dot) {
      this.exprAllowed = false;
    } else if ((update = type.updateContext)) {
      update.call(this, prevType);
    } else {
      this.exprAllowed = type.beforeExpr;
    }
  };

  // Token-specific context update code

  types.parenR.updateContext = types.braceR.updateContext = function() {
    if (this.context.length === 1) {
      this.exprAllowed = true;
      return;
    }
    var out = this.context.pop();
    if (out === types$1.b_stat && this.curContext().token === "function") {
      out = this.context.pop();
    }
    this.exprAllowed = !out.isExpr;
  };

  types.braceL.updateContext = function(prevType) {
    this.context.push(
      this.braceIsBlock(prevType) ? types$1.b_stat : types$1.b_expr
    );
    this.exprAllowed = true;
  };

  types.dollarBraceL.updateContext = function() {
    this.context.push(types$1.b_tmpl);
    this.exprAllowed = true;
  };

  types.parenL.updateContext = function(prevType) {
    var statementParens =
      prevType === types._if ||
      prevType === types._for ||
      prevType === types._with ||
      prevType === types._while;
    this.context.push(statementParens ? types$1.p_stat : types$1.p_expr);
    this.exprAllowed = true;
  };

  types.incDec.updateContext = function() {
    // tokExprAllowed stays unchanged
  };

  types._function.updateContext = types._class.updateContext = function(
    prevType
  ) {
    if (
      prevType.beforeExpr &&
      prevType !== types.semi &&
      prevType !== types._else &&
      !(
        prevType === types._return &&
        lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
      ) &&
      !(
        (prevType === types.colon || prevType === types.braceL) &&
        this.curContext() === types$1.b_stat
      )
    ) {
      this.context.push(types$1.f_expr);
    } else {
      this.context.push(types$1.f_stat);
    }
    this.exprAllowed = false;
  };

  types.backQuote.updateContext = function() {
    if (this.curContext() === types$1.q_tmpl) {
      this.context.pop();
    } else {
      this.context.push(types$1.q_tmpl);
    }
    this.exprAllowed = false;
  };

  types.star.updateContext = function(prevType) {
    if (prevType === types._function) {
      var index = this.context.length - 1;
      if (this.context[index] === types$1.f_expr) {
        this.context[index] = types$1.f_expr_gen;
      } else {
        this.context[index] = types$1.f_gen;
      }
    }
    this.exprAllowed = true;
  };

  types.name.updateContext = function(prevType) {
    var allowed = false;
    if (this.options.ecmaVersion >= 6 && prevType !== types.dot) {
      if (
        (this.value === "of" && !this.exprAllowed) ||
        (this.value === "yield" && this.inGeneratorContext())
      ) {
        allowed = true;
      }
    }
    this.exprAllowed = allowed;
  };

  // This file contains Unicode properties extracted from the ECMAScript
  // specification. The lists are extracted like so:
  // $$('#table-binary-unicode-properties > figure > table > tbody > tr > td:nth-child(1) code').map(el => el.innerText)

  // #table-binary-unicode-properties
  var ecma9BinaryProperties =
    "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
  var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
  var ecma11BinaryProperties = ecma10BinaryProperties;
  var unicodeBinaryProperties = {
    9: ecma9BinaryProperties,
    10: ecma10BinaryProperties,
    11: ecma11BinaryProperties,
  };

  // #table-unicode-general-category-values
  var unicodeGeneralCategoryValues =
    "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";

  // #table-unicode-script-values
  var ecma9ScriptValues =
    "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
  var ecma10ScriptValues =
    ecma9ScriptValues +
    " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
  var ecma11ScriptValues =
    ecma10ScriptValues +
    " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
  var unicodeScriptValues = {
    9: ecma9ScriptValues,
    10: ecma10ScriptValues,
    11: ecma11ScriptValues,
  };

  var data = {};
  function buildUnicodeData(ecmaVersion) {
    var d = (data[ecmaVersion] = {
      binary: wordsRegexp(
        unicodeBinaryProperties[ecmaVersion] +
          " " +
          unicodeGeneralCategoryValues
      ),
      nonBinary: {
        General_Category: wordsRegexp(unicodeGeneralCategoryValues),
        Script: wordsRegexp(unicodeScriptValues[ecmaVersion]),
      },
    });
    d.nonBinary.Script_Extensions = d.nonBinary.Script;

    d.nonBinary.gc = d.nonBinary.General_Category;
    d.nonBinary.sc = d.nonBinary.Script;
    d.nonBinary.scx = d.nonBinary.Script_Extensions;
  }
  buildUnicodeData(9);
  buildUnicodeData(10);
  buildUnicodeData(11);

  var pp$8 = Parser.prototype;

  var RegExpValidationState = function RegExpValidationState(parser) {
    this.parser = parser;
    this.validFlags =
      "gim" +
      (parser.options.ecmaVersion >= 6 ? "uy" : "") +
      (parser.options.ecmaVersion >= 9 ? "s" : "");
    this.unicodeProperties =
      data[parser.options.ecmaVersion >= 11 ? 11 : parser.options.ecmaVersion];
    this.source = "";
    this.flags = "";
    this.start = 0;
    this.switchU = false;
    this.switchN = false;
    this.pos = 0;
    this.lastIntValue = 0;
    this.lastStringValue = "";
    this.lastAssertionIsQuantifiable = false;
    this.numCapturingParens = 0;
    this.maxBackReference = 0;
    this.groupNames = [];
    this.backReferenceNames = [];
  };

  RegExpValidationState.prototype.reset = function reset(
    start,
    pattern,
    flags
  ) {
    var unicode = flags.indexOf("u") !== -1;
    this.start = start | 0;
    this.source = pattern + "";
    this.flags = flags;
    this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
    this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
  };

  RegExpValidationState.prototype.raise = function raise(message) {
    this.parser.raiseRecoverable(
      this.start,
      "Invalid regular expression: /" + this.source + "/: " + message
    );
  };

  // If u flag is given, this returns the code point at the index (it combines a surrogate pair).
  // Otherwise, this returns the code unit of the index (can be a part of a surrogate pair).
  RegExpValidationState.prototype.at = function at(i) {
    var s = this.source;
    var l = s.length;
    if (i >= l) {
      return -1;
    }
    var c = s.charCodeAt(i);
    if (!this.switchU || c <= 0xd7ff || c >= 0xe000 || i + 1 >= l) {
      return c;
    }
    var next = s.charCodeAt(i + 1);
    return next >= 0xdc00 && next <= 0xdfff ? (c << 10) + next - 0x35fdc00 : c;
  };

  RegExpValidationState.prototype.nextIndex = function nextIndex(i) {
    var s = this.source;
    var l = s.length;
    if (i >= l) {
      return l;
    }
    var c = s.charCodeAt(i),
      next;
    if (
      !this.switchU ||
      c <= 0xd7ff ||
      c >= 0xe000 ||
      i + 1 >= l ||
      (next = s.charCodeAt(i + 1)) < 0xdc00 ||
      next > 0xdfff
    ) {
      return i + 1;
    }
    return i + 2;
  };

  RegExpValidationState.prototype.current = function current() {
    return this.at(this.pos);
  };

  RegExpValidationState.prototype.lookahead = function lookahead() {
    return this.at(this.nextIndex(this.pos));
  };

  RegExpValidationState.prototype.advance = function advance() {
    this.pos = this.nextIndex(this.pos);
  };

  RegExpValidationState.prototype.eat = function eat(ch) {
    if (this.current() === ch) {
      this.advance();
      return true;
    }
    return false;
  };

  function codePointToString(ch) {
    if (ch <= 0xffff) {
      return String.fromCharCode(ch);
    }
    ch -= 0x10000;
    return String.fromCharCode((ch >> 10) + 0xd800, (ch & 0x03ff) + 0xdc00);
  }

  /**
   * Validate the flags part of a given RegExpLiteral.
   *
   * @param {RegExpValidationState} state The state to validate RegExp.
   * @returns {void}
   */
  pp$8.validateRegExpFlags = function(state) {
    var validFlags = state.validFlags;
    var flags = state.flags;

    for (var i = 0; i < flags.length; i++) {
      var flag = flags.charAt(i);
      if (validFlags.indexOf(flag) === -1) {
        this.raise(state.start, "Invalid regular expression flag");
      }
      if (flags.indexOf(flag, i + 1) > -1) {
        this.raise(state.start, "Duplicate regular expression flag");
      }
    }
  };

  /**
   * Validate the pattern part of a given RegExpLiteral.
   *
   * @param {RegExpValidationState} state The state to validate RegExp.
   * @returns {void}
   */
  pp$8.validateRegExpPattern = function(state) {
    this.regexp_pattern(state);

    // The goal symbol for the parse is |Pattern[~U, ~N]|. If the result of
    // parsing contains a |GroupName|, reparse with the goal symbol
    // |Pattern[~U, +N]| and use this result instead. Throw a *SyntaxError*
    // exception if _P_ did not conform to the grammar, if any elements of _P_
    // were not matched by the parse, or if any Early Error conditions exist.
    if (
      !state.switchN &&
      this.options.ecmaVersion >= 9 &&
      state.groupNames.length > 0
    ) {
      state.switchN = true;
      this.regexp_pattern(state);
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
  pp$8.regexp_pattern = function(state) {
    state.pos = 0;
    state.lastIntValue = 0;
    state.lastStringValue = "";
    state.lastAssertionIsQuantifiable = false;
    state.numCapturingParens = 0;
    state.maxBackReference = 0;
    state.groupNames.length = 0;
    state.backReferenceNames.length = 0;

    this.regexp_disjunction(state);

    if (state.pos !== state.source.length) {
      // Make the same messages as V8.
      if (state.eat(0x29 /* ) */)) {
        state.raise("Unmatched ')'");
      }
      if (state.eat(0x5d /* ] */) || state.eat(0x7d /* } */)) {
        state.raise("Lone quantifier brackets");
      }
    }
    if (state.maxBackReference > state.numCapturingParens) {
      state.raise("Invalid escape");
    }
    for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
      var name = list[i];

      if (state.groupNames.indexOf(name) === -1) {
        state.raise("Invalid named capture referenced");
      }
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
  pp$8.regexp_disjunction = function(state) {
    this.regexp_alternative(state);
    while (state.eat(0x7c /* | */)) {
      this.regexp_alternative(state);
    }

    // Make the same message as V8.
    if (this.regexp_eatQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }
    if (state.eat(0x7b /* { */)) {
      state.raise("Lone quantifier brackets");
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
  pp$8.regexp_alternative = function(state) {
    while (state.pos < state.source.length && this.regexp_eatTerm(state)) {}
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term
  pp$8.regexp_eatTerm = function(state) {
    if (this.regexp_eatAssertion(state)) {
      // Handle `QuantifiableAssertion Quantifier` alternative.
      // `state.lastAssertionIsQuantifiable` is true if the last eaten Assertion
      // is a QuantifiableAssertion.
      if (
        state.lastAssertionIsQuantifiable &&
        this.regexp_eatQuantifier(state)
      ) {
        // Make the same message as V8.
        if (state.switchU) {
          state.raise("Invalid quantifier");
        }
      }
      return true;
    }

    if (
      state.switchU
        ? this.regexp_eatAtom(state)
        : this.regexp_eatExtendedAtom(state)
    ) {
      this.regexp_eatQuantifier(state);
      return true;
    }

    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion
  pp$8.regexp_eatAssertion = function(state) {
    var start = state.pos;
    state.lastAssertionIsQuantifiable = false;

    // ^, $
    if (state.eat(0x5e /* ^ */) || state.eat(0x24 /* $ */)) {
      return true;
    }

    // \b \B
    if (state.eat(0x5c /* \ */)) {
      if (state.eat(0x42 /* B */) || state.eat(0x62 /* b */)) {
        return true;
      }
      state.pos = start;
    }

    // Lookahead / Lookbehind
    if (state.eat(0x28 /* ( */) && state.eat(0x3f /* ? */)) {
      var lookbehind = false;
      if (this.options.ecmaVersion >= 9) {
        lookbehind = state.eat(0x3c /* < */);
      }
      if (state.eat(0x3d /* = */) || state.eat(0x21 /* ! */)) {
        this.regexp_disjunction(state);
        if (!state.eat(0x29 /* ) */)) {
          state.raise("Unterminated group");
        }
        state.lastAssertionIsQuantifiable = !lookbehind;
        return true;
      }
    }

    state.pos = start;
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
  pp$8.regexp_eatQuantifier = function(state, noError) {
    if (noError === void 0) noError = false;

    if (this.regexp_eatQuantifierPrefix(state, noError)) {
      state.eat(0x3f /* ? */);
      return true;
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
  pp$8.regexp_eatQuantifierPrefix = function(state, noError) {
    return (
      state.eat(0x2a /* * */) ||
      state.eat(0x2b /* + */) ||
      state.eat(0x3f /* ? */) ||
      this.regexp_eatBracedQuantifier(state, noError)
    );
  };
  pp$8.regexp_eatBracedQuantifier = function(state, noError) {
    var start = state.pos;
    if (state.eat(0x7b /* { */)) {
      var min = 0,
        max = -1;
      if (this.regexp_eatDecimalDigits(state)) {
        min = state.lastIntValue;
        if (state.eat(0x2c /* , */) && this.regexp_eatDecimalDigits(state)) {
          max = state.lastIntValue;
        }
        if (state.eat(0x7d /* } */)) {
          // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-term
          if (max !== -1 && max < min && !noError) {
            state.raise("numbers out of order in {} quantifier");
          }
          return true;
        }
      }
      if (state.switchU && !noError) {
        state.raise("Incomplete quantifier");
      }
      state.pos = start;
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
  pp$8.regexp_eatAtom = function(state) {
    return (
      this.regexp_eatPatternCharacters(state) ||
      state.eat(0x2e /* . */) ||
      this.regexp_eatReverseSolidusAtomEscape(state) ||
      this.regexp_eatCharacterClass(state) ||
      this.regexp_eatUncapturingGroup(state) ||
      this.regexp_eatCapturingGroup(state)
    );
  };
  pp$8.regexp_eatReverseSolidusAtomEscape = function(state) {
    var start = state.pos;
    if (state.eat(0x5c /* \ */)) {
      if (this.regexp_eatAtomEscape(state)) {
        return true;
      }
      state.pos = start;
    }
    return false;
  };
  pp$8.regexp_eatUncapturingGroup = function(state) {
    var start = state.pos;
    if (state.eat(0x28 /* ( */)) {
      if (state.eat(0x3f /* ? */) && state.eat(0x3a /* : */)) {
        this.regexp_disjunction(state);
        if (state.eat(0x29 /* ) */)) {
          return true;
        }
        state.raise("Unterminated group");
      }
      state.pos = start;
    }
    return false;
  };
  pp$8.regexp_eatCapturingGroup = function(state) {
    if (state.eat(0x28 /* ( */)) {
      if (this.options.ecmaVersion >= 9) {
        this.regexp_groupSpecifier(state);
      } else if (state.current() === 0x3f /* ? */) {
        state.raise("Invalid group");
      }
      this.regexp_disjunction(state);
      if (state.eat(0x29 /* ) */)) {
        state.numCapturingParens += 1;
        return true;
      }
      state.raise("Unterminated group");
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom
  pp$8.regexp_eatExtendedAtom = function(state) {
    return (
      state.eat(0x2e /* . */) ||
      this.regexp_eatReverseSolidusAtomEscape(state) ||
      this.regexp_eatCharacterClass(state) ||
      this.regexp_eatUncapturingGroup(state) ||
      this.regexp_eatCapturingGroup(state) ||
      this.regexp_eatInvalidBracedQuantifier(state) ||
      this.regexp_eatExtendedPatternCharacter(state)
    );
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier
  pp$8.regexp_eatInvalidBracedQuantifier = function(state) {
    if (this.regexp_eatBracedQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
  pp$8.regexp_eatSyntaxCharacter = function(state) {
    var ch = state.current();
    if (isSyntaxCharacter(ch)) {
      state.lastIntValue = ch;
      state.advance();
      return true;
    }
    return false;
  };
  function isSyntaxCharacter(ch) {
    return (
      ch === 0x24 /* $ */ ||
      (ch >= 0x28 /* ( */ && ch <= 0x2b) /* + */ ||
      ch === 0x2e /* . */ ||
      ch === 0x3f /* ? */ ||
      (ch >= 0x5b /* [ */ && ch <= 0x5e) /* ^ */ ||
      (ch >= 0x7b /* { */ && ch <= 0x7d) /* } */
    );
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
  // But eat eager.
  pp$8.regexp_eatPatternCharacters = function(state) {
    var start = state.pos;
    var ch = 0;
    while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
      state.advance();
    }
    return state.pos !== start;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedPatternCharacter
  pp$8.regexp_eatExtendedPatternCharacter = function(state) {
    var ch = state.current();
    if (
      ch !== -1 &&
      ch !== 0x24 /* $ */ &&
      !((ch >= 0x28 /* ( */ && ch <= 0x2b) /* + */) &&
      ch !== 0x2e /* . */ &&
      ch !== 0x3f /* ? */ &&
      ch !== 0x5b /* [ */ &&
      ch !== 0x5e /* ^ */ &&
      ch !== 0x7c /* | */
    ) {
      state.advance();
      return true;
    }
    return false;
  };

  // GroupSpecifier[U] ::
  //   [empty]
  //   `?` GroupName[?U]
  pp$8.regexp_groupSpecifier = function(state) {
    if (state.eat(0x3f /* ? */)) {
      if (this.regexp_eatGroupName(state)) {
        if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
          state.raise("Duplicate capture group name");
        }
        state.groupNames.push(state.lastStringValue);
        return;
      }
      state.raise("Invalid group");
    }
  };

  // GroupName[U] ::
  //   `<` RegExpIdentifierName[?U] `>`
  // Note: this updates `state.lastStringValue` property with the eaten name.
  pp$8.regexp_eatGroupName = function(state) {
    state.lastStringValue = "";
    if (state.eat(0x3c /* < */)) {
      if (
        this.regexp_eatRegExpIdentifierName(state) &&
        state.eat(0x3e /* > */)
      ) {
        return true;
      }
      state.raise("Invalid capture group name");
    }
    return false;
  };

  // RegExpIdentifierName[U] ::
  //   RegExpIdentifierStart[?U]
  //   RegExpIdentifierName[?U] RegExpIdentifierPart[?U]
  // Note: this updates `state.lastStringValue` property with the eaten name.
  pp$8.regexp_eatRegExpIdentifierName = function(state) {
    state.lastStringValue = "";
    if (this.regexp_eatRegExpIdentifierStart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue);
      while (this.regexp_eatRegExpIdentifierPart(state)) {
        state.lastStringValue += codePointToString(state.lastIntValue);
      }
      return true;
    }
    return false;
  };

  // RegExpIdentifierStart[U] ::
  //   UnicodeIDStart
  //   `$`
  //   `_`
  //   `\` RegExpUnicodeEscapeSequence[?U]
  pp$8.regexp_eatRegExpIdentifierStart = function(state) {
    var start = state.pos;
    var ch = state.current();
    state.advance();

    if (
      ch === 0x5c /* \ */ &&
      this.regexp_eatRegExpUnicodeEscapeSequence(state)
    ) {
      ch = state.lastIntValue;
    }
    if (isRegExpIdentifierStart(ch)) {
      state.lastIntValue = ch;
      return true;
    }

    state.pos = start;
    return false;
  };
  function isRegExpIdentifierStart(ch) {
    return (
      isIdentifierStart(ch, true) || ch === 0x24 /* $ */ || ch === 0x5f
    ); /* _ */
  }

  // RegExpIdentifierPart[U] ::
  //   UnicodeIDContinue
  //   `$`
  //   `_`
  //   `\` RegExpUnicodeEscapeSequence[?U]
  //   <ZWNJ>
  //   <ZWJ>
  pp$8.regexp_eatRegExpIdentifierPart = function(state) {
    var start = state.pos;
    var ch = state.current();
    state.advance();

    if (
      ch === 0x5c /* \ */ &&
      this.regexp_eatRegExpUnicodeEscapeSequence(state)
    ) {
      ch = state.lastIntValue;
    }
    if (isRegExpIdentifierPart(ch)) {
      state.lastIntValue = ch;
      return true;
    }

    state.pos = start;
    return false;
  };
  function isRegExpIdentifierPart(ch) {
    return (
      isIdentifierChar(ch, true) ||
      ch === 0x24 /* $ */ ||
      ch === 0x5f /* _ */ ||
      ch === 0x200c /* <ZWNJ> */ ||
      ch === 0x200d
    ); /* <ZWJ> */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape
  pp$8.regexp_eatAtomEscape = function(state) {
    if (
      this.regexp_eatBackReference(state) ||
      this.regexp_eatCharacterClassEscape(state) ||
      this.regexp_eatCharacterEscape(state) ||
      (state.switchN && this.regexp_eatKGroupName(state))
    ) {
      return true;
    }
    if (state.switchU) {
      // Make the same message as V8.
      if (state.current() === 0x63 /* c */) {
        state.raise("Invalid unicode escape");
      }
      state.raise("Invalid escape");
    }
    return false;
  };
  pp$8.regexp_eatBackReference = function(state) {
    var start = state.pos;
    if (this.regexp_eatDecimalEscape(state)) {
      var n = state.lastIntValue;
      if (state.switchU) {
        // For SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
        if (n > state.maxBackReference) {
          state.maxBackReference = n;
        }
        return true;
      }
      if (n <= state.numCapturingParens) {
        return true;
      }
      state.pos = start;
    }
    return false;
  };
  pp$8.regexp_eatKGroupName = function(state) {
    if (state.eat(0x6b /* k */)) {
      if (this.regexp_eatGroupName(state)) {
        state.backReferenceNames.push(state.lastStringValue);
        return true;
      }
      state.raise("Invalid named reference");
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape
  pp$8.regexp_eatCharacterEscape = function(state) {
    return (
      this.regexp_eatControlEscape(state) ||
      this.regexp_eatCControlLetter(state) ||
      this.regexp_eatZero(state) ||
      this.regexp_eatHexEscapeSequence(state) ||
      this.regexp_eatRegExpUnicodeEscapeSequence(state) ||
      (!state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state)) ||
      this.regexp_eatIdentityEscape(state)
    );
  };
  pp$8.regexp_eatCControlLetter = function(state) {
    var start = state.pos;
    if (state.eat(0x63 /* c */)) {
      if (this.regexp_eatControlLetter(state)) {
        return true;
      }
      state.pos = start;
    }
    return false;
  };
  pp$8.regexp_eatZero = function(state) {
    if (
      state.current() === 0x30 /* 0 */ &&
      !isDecimalDigit(state.lookahead())
    ) {
      state.lastIntValue = 0;
      state.advance();
      return true;
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
  pp$8.regexp_eatControlEscape = function(state) {
    var ch = state.current();
    if (ch === 0x74 /* t */) {
      state.lastIntValue = 0x09; /* \t */
      state.advance();
      return true;
    }
    if (ch === 0x6e /* n */) {
      state.lastIntValue = 0x0a; /* \n */
      state.advance();
      return true;
    }
    if (ch === 0x76 /* v */) {
      state.lastIntValue = 0x0b; /* \v */
      state.advance();
      return true;
    }
    if (ch === 0x66 /* f */) {
      state.lastIntValue = 0x0c; /* \f */
      state.advance();
      return true;
    }
    if (ch === 0x72 /* r */) {
      state.lastIntValue = 0x0d; /* \r */
      state.advance();
      return true;
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
  pp$8.regexp_eatControlLetter = function(state) {
    var ch = state.current();
    if (isControlLetter(ch)) {
      state.lastIntValue = ch % 0x20;
      state.advance();
      return true;
    }
    return false;
  };
  function isControlLetter(ch) {
    return (
      (ch >= 0x41 /* A */ && ch <= 0x5a) /* Z */ ||
      (ch >= 0x61 /* a */ && ch <= 0x7a) /* z */
    );
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
  pp$8.regexp_eatRegExpUnicodeEscapeSequence = function(state) {
    var start = state.pos;

    if (state.eat(0x75 /* u */)) {
      if (this.regexp_eatFixedHexDigits(state, 4)) {
        var lead = state.lastIntValue;
        if (state.switchU && lead >= 0xd800 && lead <= 0xdbff) {
          var leadSurrogateEnd = state.pos;
          if (
            state.eat(0x5c /* \ */) &&
            state.eat(0x75 /* u */) &&
            this.regexp_eatFixedHexDigits(state, 4)
          ) {
            var trail = state.lastIntValue;
            if (trail >= 0xdc00 && trail <= 0xdfff) {
              state.lastIntValue =
                (lead - 0xd800) * 0x400 + (trail - 0xdc00) + 0x10000;
              return true;
            }
          }
          state.pos = leadSurrogateEnd;
          state.lastIntValue = lead;
        }
        return true;
      }
      if (
        state.switchU &&
        state.eat(0x7b /* { */) &&
        this.regexp_eatHexDigits(state) &&
        state.eat(0x7d /* } */) &&
        isValidUnicode(state.lastIntValue)
      ) {
        return true;
      }
      if (state.switchU) {
        state.raise("Invalid unicode escape");
      }
      state.pos = start;
    }

    return false;
  };
  function isValidUnicode(ch) {
    return ch >= 0 && ch <= 0x10ffff;
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape
  pp$8.regexp_eatIdentityEscape = function(state) {
    if (state.switchU) {
      if (this.regexp_eatSyntaxCharacter(state)) {
        return true;
      }
      if (state.eat(0x2f /* / */)) {
        state.lastIntValue = 0x2f; /* / */
        return true;
      }
      return false;
    }

    var ch = state.current();
    if (ch !== 0x63 /* c */ && (!state.switchN || ch !== 0x6b) /* k */) {
      state.lastIntValue = ch;
      state.advance();
      return true;
    }

    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
  pp$8.regexp_eatDecimalEscape = function(state) {
    state.lastIntValue = 0;
    var ch = state.current();
    if (ch >= 0x31 /* 1 */ && ch <= 0x39 /* 9 */) {
      do {
        state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30) /* 0 */;
        state.advance();
      } while ((ch = state.current()) >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */);
      return true;
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
  pp$8.regexp_eatCharacterClassEscape = function(state) {
    var ch = state.current();

    if (isCharacterClassEscape(ch)) {
      state.lastIntValue = -1;
      state.advance();
      return true;
    }

    if (
      state.switchU &&
      this.options.ecmaVersion >= 9 &&
      (ch === 0x50 /* P */ || ch === 0x70) /* p */
    ) {
      state.lastIntValue = -1;
      state.advance();
      if (
        state.eat(0x7b /* { */) &&
        this.regexp_eatUnicodePropertyValueExpression(state) &&
        state.eat(0x7d /* } */)
      ) {
        return true;
      }
      state.raise("Invalid property name");
    }

    return false;
  };
  function isCharacterClassEscape(ch) {
    return (
      ch === 0x64 /* d */ ||
      ch === 0x44 /* D */ ||
      ch === 0x73 /* s */ ||
      ch === 0x53 /* S */ ||
      ch === 0x77 /* w */ ||
      ch === 0x57 /* W */
    );
  }

  // UnicodePropertyValueExpression ::
  //   UnicodePropertyName `=` UnicodePropertyValue
  //   LoneUnicodePropertyNameOrValue
  pp$8.regexp_eatUnicodePropertyValueExpression = function(state) {
    var start = state.pos;

    // UnicodePropertyName `=` UnicodePropertyValue
    if (this.regexp_eatUnicodePropertyName(state) && state.eat(0x3d /* = */)) {
      var name = state.lastStringValue;
      if (this.regexp_eatUnicodePropertyValue(state)) {
        var value = state.lastStringValue;
        this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
        return true;
      }
    }
    state.pos = start;

    // LoneUnicodePropertyNameOrValue
    if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
      var nameOrValue = state.lastStringValue;
      this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
      return true;
    }
    return false;
  };
  pp$8.regexp_validateUnicodePropertyNameAndValue = function(
    state,
    name,
    value
  ) {
    if (!has(state.unicodeProperties.nonBinary, name)) {
      state.raise("Invalid property name");
    }
    if (!state.unicodeProperties.nonBinary[name].test(value)) {
      state.raise("Invalid property value");
    }
  };
  pp$8.regexp_validateUnicodePropertyNameOrValue = function(
    state,
    nameOrValue
  ) {
    if (!state.unicodeProperties.binary.test(nameOrValue)) {
      state.raise("Invalid property name");
    }
  };

  // UnicodePropertyName ::
  //   UnicodePropertyNameCharacters
  pp$8.regexp_eatUnicodePropertyName = function(state) {
    var ch = 0;
    state.lastStringValue = "";
    while (isUnicodePropertyNameCharacter((ch = state.current()))) {
      state.lastStringValue += codePointToString(ch);
      state.advance();
    }
    return state.lastStringValue !== "";
  };
  function isUnicodePropertyNameCharacter(ch) {
    return isControlLetter(ch) || ch === 0x5f; /* _ */
  }

  // UnicodePropertyValue ::
  //   UnicodePropertyValueCharacters
  pp$8.regexp_eatUnicodePropertyValue = function(state) {
    var ch = 0;
    state.lastStringValue = "";
    while (isUnicodePropertyValueCharacter((ch = state.current()))) {
      state.lastStringValue += codePointToString(ch);
      state.advance();
    }
    return state.lastStringValue !== "";
  };
  function isUnicodePropertyValueCharacter(ch) {
    return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
  }

  // LoneUnicodePropertyNameOrValue ::
  //   UnicodePropertyValueCharacters
  pp$8.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
    return this.regexp_eatUnicodePropertyValue(state);
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
  pp$8.regexp_eatCharacterClass = function(state) {
    if (state.eat(0x5b /* [ */)) {
      state.eat(0x5e /* ^ */);
      this.regexp_classRanges(state);
      if (state.eat(0x5d /* ] */)) {
        return true;
      }
      // Unreachable since it threw "unterminated regular expression" error before.
      state.raise("Unterminated character class");
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
  // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
  // https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
  pp$8.regexp_classRanges = function(state) {
    while (this.regexp_eatClassAtom(state)) {
      var left = state.lastIntValue;
      if (state.eat(0x2d /* - */) && this.regexp_eatClassAtom(state)) {
        var right = state.lastIntValue;
        if (state.switchU && (left === -1 || right === -1)) {
          state.raise("Invalid character class");
        }
        if (left !== -1 && right !== -1 && left > right) {
          state.raise("Range out of order in character class");
        }
      }
    }
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
  // https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
  pp$8.regexp_eatClassAtom = function(state) {
    var start = state.pos;

    if (state.eat(0x5c /* \ */)) {
      if (this.regexp_eatClassEscape(state)) {
        return true;
      }
      if (state.switchU) {
        // Make the same message as V8.
        var ch$1 = state.current();
        if (ch$1 === 0x63 /* c */ || isOctalDigit(ch$1)) {
          state.raise("Invalid class escape");
        }
        state.raise("Invalid escape");
      }
      state.pos = start;
    }

    var ch = state.current();
    if (ch !== 0x5d /* ] */) {
      state.lastIntValue = ch;
      state.advance();
      return true;
    }

    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassEscape
  pp$8.regexp_eatClassEscape = function(state) {
    var start = state.pos;

    if (state.eat(0x62 /* b */)) {
      state.lastIntValue = 0x08; /* <BS> */
      return true;
    }

    if (state.switchU && state.eat(0x2d /* - */)) {
      state.lastIntValue = 0x2d; /* - */
      return true;
    }

    if (!state.switchU && state.eat(0x63 /* c */)) {
      if (this.regexp_eatClassControlLetter(state)) {
        return true;
      }
      state.pos = start;
    }

    return (
      this.regexp_eatCharacterClassEscape(state) ||
      this.regexp_eatCharacterEscape(state)
    );
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassControlLetter
  pp$8.regexp_eatClassControlLetter = function(state) {
    var ch = state.current();
    if (isDecimalDigit(ch) || ch === 0x5f /* _ */) {
      state.lastIntValue = ch % 0x20;
      state.advance();
      return true;
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
  pp$8.regexp_eatHexEscapeSequence = function(state) {
    var start = state.pos;
    if (state.eat(0x78 /* x */)) {
      if (this.regexp_eatFixedHexDigits(state, 2)) {
        return true;
      }
      if (state.switchU) {
        state.raise("Invalid escape");
      }
      state.pos = start;
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
  pp$8.regexp_eatDecimalDigits = function(state) {
    var start = state.pos;
    var ch = 0;
    state.lastIntValue = 0;
    while (isDecimalDigit((ch = state.current()))) {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30) /* 0 */;
      state.advance();
    }
    return state.pos !== start;
  };
  function isDecimalDigit(ch) {
    return ch >= 0x30 /* 0 */ && ch <= 0x39; /* 9 */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
  pp$8.regexp_eatHexDigits = function(state) {
    var start = state.pos;
    var ch = 0;
    state.lastIntValue = 0;
    while (isHexDigit((ch = state.current()))) {
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
      state.advance();
    }
    return state.pos !== start;
  };
  function isHexDigit(ch) {
    return (
      (ch >= 0x30 /* 0 */ && ch <= 0x39) /* 9 */ ||
      (ch >= 0x41 /* A */ && ch <= 0x46) /* F */ ||
      (ch >= 0x61 /* a */ && ch <= 0x66) /* f */
    );
  }
  function hexToInt(ch) {
    if (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) {
      return 10 + (ch - 0x41) /* A */;
    }
    if (ch >= 0x61 /* a */ && ch <= 0x66 /* f */) {
      return 10 + (ch - 0x61) /* a */;
    }
    return ch - 0x30; /* 0 */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-LegacyOctalEscapeSequence
  // Allows only 0-377(octal) i.e. 0-255(decimal).
  pp$8.regexp_eatLegacyOctalEscapeSequence = function(state) {
    if (this.regexp_eatOctalDigit(state)) {
      var n1 = state.lastIntValue;
      if (this.regexp_eatOctalDigit(state)) {
        var n2 = state.lastIntValue;
        if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
          state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
        } else {
          state.lastIntValue = n1 * 8 + n2;
        }
      } else {
        state.lastIntValue = n1;
      }
      return true;
    }
    return false;
  };

  // https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
  pp$8.regexp_eatOctalDigit = function(state) {
    var ch = state.current();
    if (isOctalDigit(ch)) {
      state.lastIntValue = ch - 0x30; /* 0 */
      state.advance();
      return true;
    }
    state.lastIntValue = 0;
    return false;
  };
  function isOctalDigit(ch) {
    return ch >= 0x30 /* 0 */ && ch <= 0x37; /* 7 */
  }

  // https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
  // https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
  // And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
  pp$8.regexp_eatFixedHexDigits = function(state, length) {
    var start = state.pos;
    state.lastIntValue = 0;
    for (var i = 0; i < length; ++i) {
      var ch = state.current();
      if (!isHexDigit(ch)) {
        state.pos = start;
        return false;
      }
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
      state.advance();
    }
    return true;
  };

  // Object type used to represent tokens. Note that normally, tokens
  // simply exist as properties on the parser object. This is only
  // used for the onToken callback and the external tokenizer.

  var Token = function Token(p) {
    this.type = p.type;
    this.value = p.value;
    this.start = p.start;
    this.end = p.end;
    if (p.options.locations) {
      this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
    }
    if (p.options.ranges) {
      this.range = [p.start, p.end];
    }
  };

  // ## Tokenizer

  var pp$9 = Parser.prototype;

  // Move to the next token

  pp$9.next = function(ignoreEscapeSequenceInKeyword) {
    if (
      !ignoreEscapeSequenceInKeyword &&
      this.type.keyword &&
      this.containsEsc
    ) {
      this.raiseRecoverable(
        this.start,
        "Escape sequence in keyword " + this.type.keyword
      );
    }
    if (this.options.onToken) {
      this.options.onToken(new Token(this));
    }

    this.lastTokEnd = this.end;
    this.lastTokStart = this.start;
    this.lastTokEndLoc = this.endLoc;
    this.lastTokStartLoc = this.startLoc;
    this.nextToken();
  };

  pp$9.getToken = function() {
    this.next();
    return new Token(this);
  };

  // If we're in an ES6 environment, make parsers iterable
  if (typeof Symbol !== "undefined") {
    pp$9[Symbol.iterator] = function() {
      var this$1 = this;

      return {
        next: function() {
          var token = this$1.getToken();
          return {
            done: token.type === types.eof,
            value: token,
          };
        },
      };
    };
  }

  // Toggle strict mode. Re-reads the next number or string to please
  // pedantic tests (`"use strict"; 010;` should fail).

  pp$9.curContext = function() {
    return this.context[this.context.length - 1];
  };

  // Read a single token, updating the parser object's token-related
  // properties.

  pp$9.nextToken = function() {
    var curContext = this.curContext();
    if (!curContext || !curContext.preserveSpace) {
      this.skipSpace();
    }

    this.start = this.pos;
    if (this.options.locations) {
      this.startLoc = this.curPosition();
    }
    if (this.pos >= this.input.length) {
      return this.finishToken(types.eof);
    }

    if (curContext.override) {
      return curContext.override(this);
    } else {
      this.readToken(this.fullCharCodeAtPos());
    }
  };

  pp$9.readToken = function(code) {
    // Identifier or keyword. '\uXXXX' sequences are allowed in
    // identifiers, so '\' also dispatches to that.
    if (
      isIdentifierStart(code, this.options.ecmaVersion >= 6) ||
      code === 92 /* '\' */
    ) {
      return this.readWord();
    }

    return this.getTokenFromCode(code);
  };

  pp$9.fullCharCodeAtPos = function() {
    var code = this.input.charCodeAt(this.pos);
    if (code <= 0xd7ff || code >= 0xe000) {
      return code;
    }
    var next = this.input.charCodeAt(this.pos + 1);
    return (code << 10) + next - 0x35fdc00;
  };

  pp$9.skipBlockComment = function() {
    var startLoc = this.options.onComment && this.curPosition();
    var start = this.pos,
      end = this.input.indexOf("*/", (this.pos += 2));
    if (end === -1) {
      this.raise(this.pos - 2, "Unterminated comment");
    }
    this.pos = end + 2;
    if (this.options.locations) {
      lineBreakG.lastIndex = start;
      var match;
      while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
        ++this.curLine;
        this.lineStart = match.index + match[0].length;
      }
    }
    if (this.options.onComment) {
      this.options.onComment(
        true,
        this.input.slice(start + 2, end),
        start,
        this.pos,
        startLoc,
        this.curPosition()
      );
    }
  };

  pp$9.skipLineComment = function(startSkip) {
    var start = this.pos;
    var startLoc = this.options.onComment && this.curPosition();
    var ch = this.input.charCodeAt((this.pos += startSkip));
    while (this.pos < this.input.length && !isNewLine(ch)) {
      ch = this.input.charCodeAt(++this.pos);
    }
    if (this.options.onComment) {
      this.options.onComment(
        false,
        this.input.slice(start + startSkip, this.pos),
        start,
        this.pos,
        startLoc,
        this.curPosition()
      );
    }
  };

  // Called at the start of the parse and after every token. Skips
  // whitespace and comments, and.

  pp$9.skipSpace = function() {
    loop: while (this.pos < this.input.length) {
      var ch = this.input.charCodeAt(this.pos);
      switch (ch) {
        case 32:
        case 160: // ' '
          ++this.pos;
          break;
        case 13:
          if (this.input.charCodeAt(this.pos + 1) === 10) {
            ++this.pos;
          }
        case 10:
        case 8232:
        case 8233:
          ++this.pos;
          if (this.options.locations) {
            ++this.curLine;
            this.lineStart = this.pos;
          }
          break;
        case 47: // '/'
          switch (this.input.charCodeAt(this.pos + 1)) {
            case 42: // '*'
              this.skipBlockComment();
              break;
            case 47:
              this.skipLineComment(2);
              break;
            default:
              break loop;
          }
          break;
        default:
          if (
            (ch > 8 && ch < 14) ||
            (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch)))
          ) {
            ++this.pos;
          } else {
            break loop;
          }
      }
    }
  };

  // Called at the end of every token. Sets `end`, `val`, and
  // maintains `context` and `exprAllowed`, and skips the space after
  // the token, so that the next one's `start` will point at the
  // right position.

  pp$9.finishToken = function(type, val) {
    this.end = this.pos;
    if (this.options.locations) {
      this.endLoc = this.curPosition();
    }
    var prevType = this.type;
    this.type = type;
    this.value = val;

    this.updateContext(prevType);
  };

  // ### Token reading

  // This is the function that is called to fetch the next token. It
  // is somewhat obscure, because it works in character codes rather
  // than characters, and because operator parsing has been inlined
  // into it.
  //
  // All in the name of speed.
  //
  pp$9.readToken_dot = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next >= 48 && next <= 57) {
      return this.readNumber(true);
    }
    var next2 = this.input.charCodeAt(this.pos + 2);
    if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
      // 46 = dot '.'
      this.pos += 3;
      return this.finishToken(types.ellipsis);
    } else {
      ++this.pos;
      return this.finishToken(types.dot);
    }
  };

  pp$9.readToken_slash = function() {
    // '/'
    var next = this.input.charCodeAt(this.pos + 1);
    if (this.exprAllowed) {
      ++this.pos;
      return this.readRegexp();
    }
    if (next === 61) {
      return this.finishOp(types.assign, 2);
    }
    return this.finishOp(types.slash, 1);
  };

  pp$9.readToken_mult_modulo_exp = function(code) {
    // '%*'
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    var tokentype = code === 42 ? types.star : types.modulo;

    // exponentiation operator ** and **=
    if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
      ++size;
      tokentype = types.starstar;
      next = this.input.charCodeAt(this.pos + 2);
    }

    if (next === 61) {
      return this.finishOp(types.assign, size + 1);
    }
    return this.finishOp(tokentype, size);
  };

  pp$9.readToken_pipe_amp = function(code) {
    // '|&'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      return this.finishOp(
        code === 124 ? types.logicalOR : types.logicalAND,
        2
      );
    }
    if (next === 61) {
      return this.finishOp(types.assign, 2);
    }
    return this.finishOp(code === 124 ? types.bitwiseOR : types.bitwiseAND, 1);
  };

  pp$9.readToken_caret = function() {
    // '^'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) {
      return this.finishOp(types.assign, 2);
    }
    return this.finishOp(types.bitwiseXOR, 1);
  };

  pp$9.readToken_plus_min = function(code) {
    // '+-'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (
        next === 45 &&
        !this.inModule &&
        this.input.charCodeAt(this.pos + 2) === 62 &&
        (this.lastTokEnd === 0 ||
          lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))
      ) {
        // A `-->` line comment
        this.skipLineComment(3);
        this.skipSpace();
        return this.nextToken();
      }
      return this.finishOp(types.incDec, 2);
    }
    if (next === 61) {
      return this.finishOp(types.assign, 2);
    }
    return this.finishOp(types.plusMin, 1);
  };

  pp$9.readToken_lt_gt = function(code) {
    // '<>'
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    if (next === code) {
      size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
      if (this.input.charCodeAt(this.pos + size) === 61) {
        return this.finishOp(types.assign, size + 1);
      }
      return this.finishOp(types.bitShift, size);
    }
    if (
      next === 33 &&
      code === 60 &&
      !this.inModule &&
      this.input.charCodeAt(this.pos + 2) === 45 &&
      this.input.charCodeAt(this.pos + 3) === 45
    ) {
      // `<!--`, an XML-style comment that should be interpreted as a line comment
      this.skipLineComment(4);
      this.skipSpace();
      return this.nextToken();
    }
    if (next === 61) {
      size = 2;
    }
    return this.finishOp(types.relational, size);
  };

  pp$9.readToken_eq_excl = function(code) {
    // '=!'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) {
      return this.finishOp(
        types.equality,
        this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2
      );
    }
    if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
      // '=>'
      this.pos += 2;
      return this.finishToken(types.arrow);
    }
    return this.finishOp(code === 61 ? types.eq : types.prefix, 1);
  };

  pp$9.getTokenFromCode = function(code) {
    switch (code) {
      // The interpretation of a dot depends on whether it is followed
      // by a digit or another two dots.
      case 46: // '.'
        return this.readToken_dot();

      // Punctuation tokens.
      case 40:
        ++this.pos;
        return this.finishToken(types.parenL);
      case 41:
        ++this.pos;
        return this.finishToken(types.parenR);
      case 59:
        ++this.pos;
        return this.finishToken(types.semi);
      case 44:
        ++this.pos;
        return this.finishToken(types.comma);
      case 91:
        ++this.pos;
        return this.finishToken(types.bracketL);
      case 93:
        ++this.pos;
        return this.finishToken(types.bracketR);
      case 123:
        ++this.pos;
        return this.finishToken(types.braceL);
      case 125:
        ++this.pos;
        return this.finishToken(types.braceR);
      case 58:
        ++this.pos;
        return this.finishToken(types.colon);
      case 63:
        ++this.pos;
        return this.finishToken(types.question);

      case 96: // '`'
        if (this.options.ecmaVersion < 6) {
          break;
        }
        ++this.pos;
        return this.finishToken(types.backQuote);

      case 48: // '0'
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 120 || next === 88) {
          return this.readRadixNumber(16);
        } // '0x', '0X' - hex number
        if (this.options.ecmaVersion >= 6) {
          if (next === 111 || next === 79) {
            return this.readRadixNumber(8);
          } // '0o', '0O' - octal number
          if (next === 98 || next === 66) {
            return this.readRadixNumber(2);
          } // '0b', '0B' - binary number
        }

      // Anything else beginning with a digit is an integer, octal
      // number, or float.
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57: // 1-9
        return this.readNumber(false);

      // Quotes produce strings.
      case 34:
      case 39: // '"', "'"
        return this.readString(code);

      // Operators are parsed inline in tiny state machines. '=' (61) is
      // often referred to. `finishOp` simply skips the amount of
      // characters it is given as second argument, and returns a token
      // of the type given by its first argument.

      case 47: // '/'
        return this.readToken_slash();

      case 37:
      case 42: // '%*'
        return this.readToken_mult_modulo_exp(code);

      case 124:
      case 38: // '|&'
        return this.readToken_pipe_amp(code);

      case 94: // '^'
        return this.readToken_caret();

      case 43:
      case 45: // '+-'
        return this.readToken_plus_min(code);

      case 60:
      case 62: // '<>'
        return this.readToken_lt_gt(code);

      case 61:
      case 33: // '=!'
        return this.readToken_eq_excl(code);

      case 126: // '~'
        return this.finishOp(types.prefix, 1);
    }

    this.raise(
      this.pos,
      "Unexpected character '" + codePointToString$1(code) + "'"
    );
  };

  pp$9.finishOp = function(type, size) {
    var str = this.input.slice(this.pos, this.pos + size);
    this.pos += size;
    return this.finishToken(type, str);
  };

  pp$9.readRegexp = function() {
    var escaped,
      inClass,
      start = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) {
        this.raise(start, "Unterminated regular expression");
      }
      var ch = this.input.charAt(this.pos);
      if (lineBreak.test(ch)) {
        this.raise(start, "Unterminated regular expression");
      }
      if (!escaped) {
        if (ch === "[") {
          inClass = true;
        } else if (ch === "]" && inClass) {
          inClass = false;
        } else if (ch === "/" && !inClass) {
          break;
        }
        escaped = ch === "\\";
      } else {
        escaped = false;
      }
      ++this.pos;
    }
    var pattern = this.input.slice(start, this.pos);
    ++this.pos;
    var flagsStart = this.pos;
    var flags = this.readWord1();
    if (this.containsEsc) {
      this.unexpected(flagsStart);
    }

    // Validate pattern
    var state =
      this.regexpState || (this.regexpState = new RegExpValidationState(this));
    state.reset(start, pattern, flags);
    this.validateRegExpFlags(state);
    this.validateRegExpPattern(state);

    // Create Literal#value property value.
    var value = null;
    try {
      value = new RegExp(pattern, flags);
    } catch (e) {
      // ESTree requires null if it failed to instantiate RegExp object.
      // https://github.com/estree/estree/blob/a27003adf4fd7bfad44de9cef372a2eacd527b1c/es5.md#regexpliteral
    }

    return this.finishToken(types.regexp, {
      pattern: pattern,
      flags: flags,
      value: value,
    });
  };

  // Read an integer in the given radix. Return null if zero digits
  // were read, the integer value otherwise. When `len` is given, this
  // will return `null` unless the integer has exactly `len` digits.

  pp$9.readInt = function(radix, len) {
    var start = this.pos,
      total = 0;
    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
      var code = this.input.charCodeAt(this.pos),
        val = void 0;
      if (code >= 97) {
        val = code - 97 + 10;
      } // a
      else if (code >= 65) {
        val = code - 65 + 10;
      } // A
      else if (code >= 48 && code <= 57) {
        val = code - 48;
      } // 0-9
      else {
        val = Infinity;
      }
      if (val >= radix) {
        break;
      }
      ++this.pos;
      total = total * radix + val;
    }
    if (this.pos === start || (len != null && this.pos - start !== len)) {
      return null;
    }

    return total;
  };

  pp$9.readRadixNumber = function(radix) {
    var start = this.pos;
    this.pos += 2; // 0x
    var val = this.readInt(radix);
    if (val == null) {
      this.raise(this.start + 2, "Expected number in radix " + radix);
    }
    if (
      this.options.ecmaVersion >= 11 &&
      this.input.charCodeAt(this.pos) === 110
    ) {
      val =
        typeof BigInt !== "undefined"
          ? BigInt(this.input.slice(start, this.pos))
          : null;
      ++this.pos;
    } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }
    return this.finishToken(types.num, val);
  };

  // Read an integer, octal integer, or floating-point number.

  pp$9.readNumber = function(startsWithDot) {
    var start = this.pos;
    if (!startsWithDot && this.readInt(10) === null) {
      this.raise(start, "Invalid number");
    }
    var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
    if (octal && this.strict) {
      this.raise(start, "Invalid number");
    }
    var next = this.input.charCodeAt(this.pos);
    if (
      !octal &&
      !startsWithDot &&
      this.options.ecmaVersion >= 11 &&
      next === 110
    ) {
      var str$1 = this.input.slice(start, this.pos);
      var val$1 = typeof BigInt !== "undefined" ? BigInt(str$1) : null;
      ++this.pos;
      if (isIdentifierStart(this.fullCharCodeAtPos())) {
        this.raise(this.pos, "Identifier directly after number");
      }
      return this.finishToken(types.num, val$1);
    }
    if (octal && /[89]/.test(this.input.slice(start, this.pos))) {
      octal = false;
    }
    if (next === 46 && !octal) {
      // '.'
      ++this.pos;
      this.readInt(10);
      next = this.input.charCodeAt(this.pos);
    }
    if ((next === 69 || next === 101) && !octal) {
      // 'eE'
      next = this.input.charCodeAt(++this.pos);
      if (next === 43 || next === 45) {
        ++this.pos;
      } // '+-'
      if (this.readInt(10) === null) {
        this.raise(start, "Invalid number");
      }
    }
    if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }

    var str = this.input.slice(start, this.pos);
    var val = octal ? parseInt(str, 8) : parseFloat(str);
    return this.finishToken(types.num, val);
  };

  // Read a string value, interpreting backslash-escapes.

  pp$9.readCodePoint = function() {
    var ch = this.input.charCodeAt(this.pos),
      code;

    if (ch === 123) {
      // '{'
      if (this.options.ecmaVersion < 6) {
        this.unexpected();
      }
      var codePos = ++this.pos;
      code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
      ++this.pos;
      if (code > 0x10ffff) {
        this.invalidStringToken(codePos, "Code point out of bounds");
      }
    } else {
      code = this.readHexChar(4);
    }
    return code;
  };

  function codePointToString$1(code) {
    // UTF-16 Decoding
    if (code <= 0xffff) {
      return String.fromCharCode(code);
    }
    code -= 0x10000;
    return String.fromCharCode((code >> 10) + 0xd800, (code & 1023) + 0xdc00);
  }

  pp$9.readString = function(quote) {
    var out = "",
      chunkStart = ++this.pos;
    for (;;) {
      if (this.pos >= this.input.length) {
        this.raise(this.start, "Unterminated string constant");
      }
      var ch = this.input.charCodeAt(this.pos);
      if (ch === quote) {
        break;
      }
      if (ch === 92) {
        // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(false);
        chunkStart = this.pos;
      } else {
        if (isNewLine(ch, this.options.ecmaVersion >= 10)) {
          this.raise(this.start, "Unterminated string constant");
        }
        ++this.pos;
      }
    }
    out += this.input.slice(chunkStart, this.pos++);
    return this.finishToken(types.string, out);
  };

  // Reads template string tokens.

  var INVALID_TEMPLATE_ESCAPE_ERROR = {};

  pp$9.tryReadTemplateToken = function() {
    this.inTemplateElement = true;
    try {
      this.readTmplToken();
    } catch (err) {
      if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
        this.readInvalidTemplateToken();
      } else {
        throw err;
      }
    }

    this.inTemplateElement = false;
  };

  pp$9.invalidStringToken = function(position, message) {
    if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
      throw INVALID_TEMPLATE_ESCAPE_ERROR;
    } else {
      this.raise(position, message);
    }
  };

  pp$9.readTmplToken = function() {
    var out = "",
      chunkStart = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) {
        this.raise(this.start, "Unterminated template");
      }
      var ch = this.input.charCodeAt(this.pos);
      if (
        ch === 96 ||
        (ch === 36 && this.input.charCodeAt(this.pos + 1) === 123)
      ) {
        // '`', '${'
        if (
          this.pos === this.start &&
          (this.type === types.template || this.type === types.invalidTemplate)
        ) {
          if (ch === 36) {
            this.pos += 2;
            return this.finishToken(types.dollarBraceL);
          } else {
            ++this.pos;
            return this.finishToken(types.backQuote);
          }
        }
        out += this.input.slice(chunkStart, this.pos);
        return this.finishToken(types.template, out);
      }
      if (ch === 92) {
        // '\'
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(true);
        chunkStart = this.pos;
      } else if (isNewLine(ch)) {
        out += this.input.slice(chunkStart, this.pos);
        ++this.pos;
        switch (ch) {
          case 13:
            if (this.input.charCodeAt(this.pos) === 10) {
              ++this.pos;
            }
          case 10:
            out += "\n";
            break;
          default:
            out += String.fromCharCode(ch);
            break;
        }
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        chunkStart = this.pos;
      } else {
        ++this.pos;
      }
    }
  };

  // Reads a template token to search for the end, without validating any escape sequences
  pp$9.readInvalidTemplateToken = function() {
    for (; this.pos < this.input.length; this.pos++) {
      switch (this.input[this.pos]) {
        case "\\":
          ++this.pos;
          break;

        case "$":
          if (this.input[this.pos + 1] !== "{") {
            break;
          }
        // falls through

        case "`":
          return this.finishToken(
            types.invalidTemplate,
            this.input.slice(this.start, this.pos)
          );

        // no default
      }
    }
    this.raise(this.start, "Unterminated template");
  };

  // Used to read escaped characters

  pp$9.readEscapedChar = function(inTemplate) {
    var ch = this.input.charCodeAt(++this.pos);
    ++this.pos;
    switch (ch) {
      case 110:
        return "\n"; // 'n' -> '\n'
      case 114:
        return "\r"; // 'r' -> '\r'
      case 120:
        return String.fromCharCode(this.readHexChar(2)); // 'x'
      case 117:
        return codePointToString$1(this.readCodePoint()); // 'u'
      case 116:
        return "\t"; // 't' -> '\t'
      case 98:
        return "\b"; // 'b' -> '\b'
      case 118:
        return "\u000b"; // 'v' -> '\u000b'
      case 102:
        return "\f"; // 'f' -> '\f'
      case 13:
        if (this.input.charCodeAt(this.pos) === 10) {
          ++this.pos;
        } // '\r\n'
      case 10: // ' \n'
        if (this.options.locations) {
          this.lineStart = this.pos;
          ++this.curLine;
        }
        return "";
      case 56:
      case 57:
        if (inTemplate) {
          var codePos = this.pos - 1;

          this.invalidStringToken(
            codePos,
            "Invalid escape sequence in template string"
          );

          return null;
        }
      default:
        if (ch >= 48 && ch <= 55) {
          var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
          var octal = parseInt(octalStr, 8);
          if (octal > 255) {
            octalStr = octalStr.slice(0, -1);
            octal = parseInt(octalStr, 8);
          }
          this.pos += octalStr.length - 1;
          ch = this.input.charCodeAt(this.pos);
          if (
            (octalStr !== "0" || ch === 56 || ch === 57) &&
            (this.strict || inTemplate)
          ) {
            this.invalidStringToken(
              this.pos - 1 - octalStr.length,
              inTemplate
                ? "Octal literal in template string"
                : "Octal literal in strict mode"
            );
          }
          return String.fromCharCode(octal);
        }
        if (isNewLine(ch)) {
          // Unicode new line characters after \ get removed from output in both
          // template literals and strings
          return "";
        }
        return String.fromCharCode(ch);
    }
  };

  // Used to read character escape sequences ('\x', '\u', '\U').

  pp$9.readHexChar = function(len) {
    var codePos = this.pos;
    var n = this.readInt(16, len);
    if (n === null) {
      this.invalidStringToken(codePos, "Bad character escape sequence");
    }
    return n;
  };

  // Read an identifier, and return it as a string. Sets `this.containsEsc`
  // to whether the word contained a '\u' escape.
  //
  // Incrementally adds only escaped chars, adding other chunks as-is
  // as a micro-optimization.

  pp$9.readWord1 = function() {
    this.containsEsc = false;
    var word = "",
      first = true,
      chunkStart = this.pos;
    var astral = this.options.ecmaVersion >= 6;
    while (this.pos < this.input.length) {
      var ch = this.fullCharCodeAtPos();
      if (isIdentifierChar(ch, astral)) {
        this.pos += ch <= 0xffff ? 1 : 2;
      } else if (ch === 92) {
        // "\"
        this.containsEsc = true;
        word += this.input.slice(chunkStart, this.pos);
        var escStart = this.pos;
        if (this.input.charCodeAt(++this.pos) !== 117) {
          // "u"
          this.invalidStringToken(
            this.pos,
            "Expecting Unicode escape sequence \\uXXXX"
          );
        }
        ++this.pos;
        var esc = this.readCodePoint();
        if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) {
          this.invalidStringToken(escStart, "Invalid Unicode escape");
        }
        word += codePointToString$1(esc);
        chunkStart = this.pos;
      } else {
        break;
      }
      first = false;
    }
    return word + this.input.slice(chunkStart, this.pos);
  };

  // Read an identifier or keyword token. Will check for reserved
  // words when necessary.

  pp$9.readWord = function() {
    var word = this.readWord1();
    var type = types.name;
    if (this.keywords.test(word)) {
      type = keywords$1[word];
    }
    return this.finishToken(type, word);
  };

  // Acorn is a tiny, fast JavaScript parser written in JavaScript.

  var version = "7.1.0";

  Parser.acorn = {
    Parser: Parser,
    version: version,
    defaultOptions: defaultOptions,
    Position: Position,
    SourceLocation: SourceLocation,
    getLineInfo: getLineInfo,
    Node: Node,
    TokenType: TokenType,
    tokTypes: types,
    keywordTypes: keywords$1,
    TokContext: TokContext,
    tokContexts: types$1,
    isIdentifierChar: isIdentifierChar,
    isIdentifierStart: isIdentifierStart,
    Token: Token,
    isNewLine: isNewLine,
    lineBreak: lineBreak,
    lineBreakG: lineBreakG,
    nonASCIIwhitespace: nonASCIIwhitespace,
  };

  // The main exported interface (under `self.acorn` when in the
  // browser) is a `parse` function that takes a code string and
  // returns an abstract syntax tree as specified by [Mozilla parser
  // API][api].
  //
  // [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

  function parse(input, options) {
    return Parser.parse(input, options);
  }

  function walk(ast, { enter, leave }) {
    return visit(ast, null, enter, leave);
  }

  let should_skip = false;
  let should_remove = false;
  let replacement = null;
  const context = {
    skip: () => (should_skip = true),
    remove: () => (should_remove = true),
    replace: (node) => (replacement = node),
  };

  const childKeys = {};

  function replace(parent, prop, index, node) {
    if (parent) {
      if (index !== null) {
        parent[prop][index] = node;
      } else {
        parent[prop] = node;
      }
    }
  }

  function remove(parent, prop, index) {
    if (parent) {
      if (index !== null) {
        parent[prop].splice(index, 1);
      } else {
        delete parent[prop];
      }
    }
  }

  function visit(node, parent, enter, leave, prop, index) {
    if (node) {
      if (enter) {
        const _should_skip = should_skip;
        const _should_remove = should_remove;
        const _replacement = replacement;
        should_skip = false;
        should_remove = false;
        replacement = null;

        enter.call(context, node, parent, prop, index);

        if (replacement) {
          node = replacement;
          replace(parent, prop, index, node);
        }

        if (should_remove) {
          remove(parent, prop, index);
        }

        const skipped = should_skip;
        const removed = should_remove;

        should_skip = _should_skip;
        should_remove = _should_remove;
        replacement = _replacement;

        if (skipped) return node;
        if (removed) return null;
      }

      const keys =
        (node.type && childKeys[node.type]) ||
        (childKeys[node.type] = Object.keys(node).filter(
          (key) => typeof node[key] === "object"
        ));

      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const value = node[key];

        if (Array.isArray(value)) {
          for (let j = 0, k = 0; j < value.length; j += 1, k += 1) {
            if (value[j] && value[j].type) {
              if (!visit(value[j], node, enter, leave, key, k)) {
                // removed
                j--;
              }
            }
          }
        } else if (value && value.type) {
          visit(value, node, enter, leave, key, null);
        }
      }

      if (leave) {
        const _replacement = replacement;
        const _should_remove = should_remove;
        replacement = null;
        should_remove = false;

        leave.call(context, node, parent, prop, index);

        if (replacement) {
          node = replacement;
          replace(parent, prop, index, node);
        }

        if (should_remove) {
          remove(parent, prop, index);
        }

        const removed = should_remove;

        replacement = _replacement;
        should_remove = _should_remove;

        if (removed) return null;
      }
    }

    return node;
  }

  const require = `function require(id) {
	if (id in __repl_lookup) return __repl_lookup[id];
	throw new Error(\`Cannot require modules dynamically (\${id})\`);
}`;

  var commonjs = {
    name: "commonjs",

    transform: (code, id) => {
      if (!/\b(require|module|exports)\b/.test(code)) return;

      try {
        const ast = parse(code, {
          ecmaVersion: 9,
        });

        const requires = [];

        walk(ast, {
          enter: (node) => {
            if (
              node.type === "CallExpression" &&
              node.callee.name === "require"
            ) {
              if (node.arguments.length !== 1) return;
              const arg = node.arguments[0];
              if (arg.type !== "Literal" || typeof arg.value !== "string")
                return;

              requires.push(arg.value);
            }
          },
        });

        const imports = requires
          .map((id, i) => `import __repl_${i} from '${id}';`)
          .join("\n");
        const lookup = `const __repl_lookup = { ${requires
          .map((id, i) => `'${id}': __repl_${i}`)
          .join(", ")} };`;

        const transformed = [
          imports,
          lookup,
          require,
          `const exports = {}; const module = { exports };`,
          code,
          `export default module.exports;`,
        ].join("\n\n");

        return {
          code: transformed,
          map: null,
        };
      } catch (err) {
        return null;
      }
    },
  };

  var glsl = {
    name: "glsl",
    transform: (code, id) => {
      if (!id.endsWith(".glsl")) return;

      return {
        code: `export default ${JSON.stringify(code)};`,
        map: null,
      };
    },
  };

  var json = {
    name: "json",
    transform: (code, id) => {
      if (!id.endsWith(".json")) return;

      return {
        code: `export default ${code};`,
        map: null,
      };
    },
  };

  self.window = self; // egregious hack to get magic-string to work in a worker

  let packagesUrl;
  let svelteUrl;
  let current_id;

  self.addEventListener("message", (event) => {
    switch (event.data.type) {
      case "init":
        packagesUrl = event.data.packagesUrl;
        svelteUrl = event.data.svelteUrl;
        importScripts(`${svelteUrl}/compiler.js`);

        break;

      case "bundle":
        const { uid, components } = event.data;

        if (components.length === 0) return;

        current_id = uid;

        setTimeout(async () => {
          if (current_id !== uid) return;

          const result = await bundle({ uid, components });

          if (result.error === ABORT) return;
          if (result && uid === current_id) postMessage(result);
        });

        break;
    }
  });

  let cached = {
    dom: {},
    ssr: {},
  };

  const ABORT = { aborted: true };

  const fetch_cache = new Map();
  function fetch_if_uncached(url) {
    if (fetch_cache.has(url)) {
      return fetch_cache.get(url);
    }

    const promise = fetch(url)
      .then(async (r) => {
        if (r.ok) {
          return {
            url: r.url,
            body: await r.text(),
          };
        }

        throw new Error(await r.text());
      })
      .catch((err) => {
        fetch_cache.delete(url);
        throw err;
      });

    fetch_cache.set(url, promise);
    return promise;
  }

  async function follow_redirects(url) {
    const res = await fetch_if_uncached(url);
    return res.url;
  }

  function compare_to_version(major, minor, patch) {
    const v = svelte.VERSION.match(/^(\d+)\.(\d+)\.(\d+)/);
    return v[1] - major || v[2] - minor || v[3] - patch;
  }

  function is_legacy_package_structure() {
    return compare_to_version(3, 4, 4) <= 0;
  }

  function has_loopGuardTimeout_feature() {
    return compare_to_version(3, 14, 0) >= 0;
  }

  async function get_bundle(uid, mode, cache, lookup) {
    let bundle;

    const imports = new Set();
    const warnings = [];
    const all_warnings = [];

    const new_cache = {};

    const repl_plugin = {
      async resolveId(importee, importer) {
        if (uid !== current_id) throw ABORT;

        // importing from Svelte
        if (importee === `svelte`) return `${svelteUrl}/index.mjs`;
        if (importee.startsWith(`svelte/`)) {
          return is_legacy_package_structure()
            ? `${svelteUrl}/${importee.slice(7)}.mjs`
            : `${svelteUrl}/${importee.slice(7)}/index.mjs`;
        }

        // importing one Svelte runtime module from another
        if (importer && importer.startsWith(svelteUrl)) {
          const resolved = new URL(importee, importer).href;
          if (resolved.endsWith(".mjs")) return resolved;
          return is_legacy_package_structure()
            ? `${resolved}.mjs`
            : `${resolved}/index.mjs`;
        }

        // importing from another file in REPL
        if (importee in lookup) return importee;
        if (importee + ".js" in lookup) return importee + ".js";
        if (importee + ".json" in lookup) return importee + ".json";

        // remove trailing slash
        if (importee.endsWith("/")) importee = importee.slice(0, -1);

        // importing from a URL
        if (importee.startsWith("http:") || importee.startsWith("https:"))
          return importee;

        // importing from (probably) unpkg
        if (importee.startsWith(".")) {
          const url = new URL(importee, importer).href;
          self.postMessage({
            type: "status",
            uid,
            message: `resolving ${url}`,
          });

          return await follow_redirects(url);
        } else {
          // fetch from unpkg
          self.postMessage({
            type: "status",
            uid,
            message: `resolving ${importee}`,
          });

          if (importer in lookup) {
            const match = /^(@[^/]+\/)?[^/]+/.exec(importee);
            if (match) imports.add(match[0]);
          }

          try {
            const pkg_url = await follow_redirects(
              `${packagesUrl}/${importee}/package.json`
            );
            const pkg_json = (await fetch_if_uncached(pkg_url)).body;
            const pkg = JSON.parse(pkg_json);

            if (pkg.svelte || pkg.module || pkg.main) {
              const url = pkg_url.replace(/\/package\.json$/, "");
              return new URL(pkg.svelte || pkg.module || pkg.main, `${url}/`)
                .href;
            }
          } catch (err) {
            // ignore
          }

          return await follow_redirects(`${packagesUrl}/${importee}`);
        }
      },
      async load(resolved) {
        if (uid !== current_id) throw ABORT;

        if (resolved in lookup) return lookup[resolved].source;

        if (!fetch_cache.has(resolved)) {
          self.postMessage({
            type: "status",
            uid,
            message: `fetching ${resolved}`,
          });
        }

        const res = await fetch_if_uncached(resolved);
        return res.body;
      },
      transform(code, id) {
        if (uid !== current_id) throw ABORT;

        self.postMessage({ type: "status", uid, message: `bundling ${id}` });

        if (!/\.svelte$/.test(id)) return null;

        const name = id
          .split("/")
          .pop()
          .split(".")[0];

        const result =
          cache[id] && cache[id].code === code
            ? cache[id].result
            : svelte.compile(
                code,
                Object.assign(
                  {
                    generate: mode,
                    format: "esm",
                    dev: true,
                    filename: name + ".svelte",
                  },
                  has_loopGuardTimeout_feature() && {
                    loopGuardTimeout: 100,
                  }
                )
              );

        new_cache[id] = { code, result };

        (result.warnings || result.stats.warnings).forEach((warning) => {
          // TODO remove stats post-launch
          warnings.push({
            message: warning.message,
            filename: warning.filename,
            start: warning.start,
            end: warning.end,
          });
        });

        return result.js;
      },
    };

    try {
      bundle = await Eo({
        input: "./App.svelte",
        plugins: [repl_plugin, commonjs, json, glsl],
        inlineDynamicImports: true,
        onwarn(warning) {
          all_warnings.push({
            message: warning.message,
          });
        },
      });

      return {
        bundle,
        imports: Array.from(imports),
        cache: new_cache,
        error: null,
        warnings,
        all_warnings,
      };
    } catch (error) {
      return {
        error,
        imports: null,
        bundle: null,
        cache: new_cache,
        warnings,
        all_warnings,
      };
    }
  }

  async function bundle({ uid, components }) {
    //console.clear();
    console.log(
      `running Svelte compiler version %c${svelte.VERSION}`,
      "font-weight: bold"
    );

    const lookup = {};
    components.forEach((component) => {
      const path = `./${component.name}.${component.type}`;
      lookup[path] = component;
    });

    let dom;

    try {
      dom = await get_bundle(uid, "dom", cached.dom, lookup);
      if (dom.error) {
        throw dom.error;
      }

      cached.dom = dom.cache;

      const dom_result = (
        await dom.bundle.generate({
          format: "iife",
          name: "SvelteComponent",
          exports: "named",
          sourcemap: true,
        })
      ).output[0];

      const ssr = false // TODO how can we do SSR?
        ? await get_bundle(uid, "ssr", cached.ssr, lookup)
        : null;

      if (ssr) {
        cached.ssr = ssr.cache;
        if (ssr.error) {
          throw ssr.error;
        }
      }

      const ssr_result = ssr
        ? (
            await ssr.bundle.generate({
              format: "iife",
              name: "SvelteComponent",
              exports: "named",
              sourcemap: true,
            })
          ).output[0]
        : null;

      return {
        uid,
        dom: dom_result,
        ssr: ssr_result,
        imports: dom.imports,
        warnings: dom.warnings,
        error: null,
      };
    } catch (err) {
      console.error(err);

      const e = err;
      delete e.toString;

      return {
        uid,
        dom: null,
        ssr: null,
        imports: null,
        warnings: dom.warnings,
        error: Object.assign({}, e, {
          message: e.message,
          stack: e.stack,
        }),
      };
    }
  }
})();
