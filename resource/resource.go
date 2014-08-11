package resource

import (
	"github.com/qor/qor"

	"reflect"
)

type Resource struct {
	Value      interface{}
	Metas      map[string]Metaor
	Finder     func(interface{}, MetaValues, *qor.Context) error
	validators []func(interface{}, MetaValues, *qor.Context) []error
	processors []func(interface{}, MetaValues, *qor.Context) []error
}

type Resourcer interface {
	GetResource() *Resource
	GetFinder() func(result interface{}, metaValues MetaValues, context *qor.Context) error
	NewSlice() interface{}
	NewStruct() interface{}
}

func (res *Resource) GetResource() *Resource {
	return res
}

func (res *Resource) GetFinder() func(result interface{}, metaValues MetaValues, context *qor.Context) error {
	return res.Finder
}

func (res *Resource) SetFinder(fc func(result interface{}, metaValues MetaValues, context *qor.Context) error) {
	res.Finder = fc
}

func (res *Resource) AddValidator(fc func(interface{}, MetaValues, *qor.Context) []error) {
	res.validators = append(res.validators, fc)
}

func (res *Resource) AddProcessor(fc func(interface{}, MetaValues, *qor.Context) []error) {
	res.processors = append(res.processors, fc)
}

func (res *Resource) RegisterMeta(metaor Metaor) {
	if res.Metas == nil {
		res.Metas = make(map[string]Metaor)
	}

	meta := metaor.GetMeta()
	meta.Base = res
	meta.UpdateMeta()
	res.Metas[meta.Name] = metaor
}

func (res *Resource) NewSlice() interface{} {
	sliceType := reflect.SliceOf(reflect.ValueOf(res.Value).Type())
	slice := reflect.MakeSlice(sliceType, 0, 0)
	slicePtr := reflect.New(sliceType)
	slicePtr.Elem().Set(slice)
	return slicePtr.Interface()
}

func (res *Resource) NewStruct() interface{} {
	return reflect.New(reflect.Indirect(reflect.ValueOf(res.Value)).Type()).Interface()
}