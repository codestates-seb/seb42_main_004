package com.example.server.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.util.Assert;


public class CustomPageRequest extends PageRequest {
    private final Sort sort;
    private final int page;
    private final int size;
    protected CustomPageRequest(int page, int size, Sort sort) {

        super(page, size, sort);

        Assert.notNull(sort, "Sort must not be null");

        this.sort = sort;
        this.page = page;
        this.size = size;
    }

    public static CustomPageRequest of(int page, int size) {
        return of(page, size, Sort.unsorted());
    }

    //첫 페이지는 -1해준다
    public static CustomPageRequest of(int page, int size, Sort sort) {
        if(page==0) {
            return new CustomPageRequest(page, size-1, sort);
        }
        return new CustomPageRequest(page, size, sort);
    }

    public static CustomPageRequest of(int page, int size, Sort.Direction direction, String... properties) {
        return of(page, size, Sort.by(direction, properties));
    }

    public static CustomPageRequest ofSize(int pageSize) {
        return CustomPageRequest.of(0, pageSize);
    }

    @Override
    public CustomPageRequest next() {
        return new CustomPageRequest(getPageNumber() + 1, getPageSize(), getSort());
    }

    @Override
    public CustomPageRequest previous() {
        return getPageNumber() == 0 ? this : new CustomPageRequest(getPageNumber() - 1, getPageSize(), getSort());
    }

    @Override
    public CustomPageRequest first() {
        return new CustomPageRequest(0, getPageSize(), getSort());
    }
    //둘째 페이지부터는 offset을 -1해준다
    @Override
    public long getOffset() {
        long offset = (long) page * (long) size;
        if(page>0){
            offset--;
        }
        return offset;
    }

    @Override
    public CustomPageRequest withPage(int pageNumber) {
        return new CustomPageRequest(pageNumber, getPageSize(), getSort());
    }

    public CustomPageRequest withSort(Sort.Direction direction, String... properties) {
        return new CustomPageRequest(getPageNumber(), getPageSize(), Sort.by(direction, properties));
    }

    public CustomPageRequest withSort(Sort sort) {
        return new CustomPageRequest(getPageNumber(), getPageSize(), sort);
    }
}
